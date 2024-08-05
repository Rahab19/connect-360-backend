import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uid } from 'uuid';
import DbHelper from '../database helpers';
import dotenv from 'dotenv';
import { User } from '../models/authmodels'
import { registerSchema } from '../helpers';
import { sendRegisterEmail, } from '../nodemailer';

dotenv.config();

const dbHelper = new DbHelper();

export async function registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
        // Validate request body
        const { error } = registerSchema.validate(req.body);
        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }

        if (!email) {
            console.log('Registration failed: Email not provided');
            return res.status(400).json({ message: 'Email is required.' });
        }

        // Check if password is provided
        if (!password) {
            console.log('Registration failed: Password not provided');
            return res.status(400).json({ message: 'Password is required.' });
        }

        // Check if user with same email already exists
        const existingUser = await dbHelper.get('getUserByEmail', { email });
        if (existingUser) {
            console.log(`Registration failed: Email ${email} is already in use`);
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Determine role and status based on email domain
        const { role, status } = determineRoleAndStatus(email);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const id = uid()


        // Insert user into database


        await dbHelper.exec('addUser', { id, name, email, password: hashedPassword, role});
        const responseMessage = status === 'pending'
            ? 'User registration pending. Awaiting admin approval.'
            : 'User successfully registered';

        return res.status(201).json({ message: responseMessage, status });


    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(error);
    }
}

function determineRoleAndStatus(email: string): { role: string, status: string } {
    if (email.endsWith('@admin.com')) {
        return { role: 'admin', status: 'active' };
    } else if (email.endsWith('@gok.com')) {
        return { role: 'official', status: 'pending' };
    } else {
        return { role: 'citizen', status: 'active' };
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (email === 'admin@admin.com' && password === 'admin @1') {
            const token = jwt.sign({ userId: 'admin', role: 'admin' }, process.env.SECRET_KEY!, { expiresIn: '2h' });
            res.status(200).json({ token, message: 'Admin logged in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error during admin login:', err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Log the login attempt
        console.log(`Login attempt for email: ${email}`);

        // Check if email is provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Check if password is provided
        if (!password) {
            console.log('Login failed: Password not provided');
            return res.status(400).json({ message: 'Password is required.' });
        }

        // Fetch user from database
        const user = await dbHelper.get('getUserByEmail', { email });
    
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user status is pending (if you have implemented this feature)
        if (user.status === 'pending') {
            console.log(`Login attempt for pending account: ${email}`);
            return res.status(403).json({ message: 'Account is pending approval.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log(`Invalid password for user: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET as string,
            { expiresIn: '5h' }
        );

        console.log(`Successful login for user: ${email}`);
        res.json({ token });
    } catch (err: any) {
        console.error('Error during user login:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

export const approveOfficial = async (req: Request, res: Response) => {
    try {
        const officialId = req.params.id;

        await dbHelper.exec('UPDATE users SET isEmailSent = 1 WHERE id = :id', { id: officialId });

        const result = await dbHelper.exec('SELECT * FROM users WHERE id = :id', { id: officialId });

        if (!Array.isArray(result) || result.length === 0) {
            return res.status(404).json({ message: 'Official not found...' });
        }

        const official = result[0];

        // Send an approval email to the official if needed
        // await sendApprovalEmail(official);

        res.json({ message: 'Official approved successfully...' });
    } catch (err) {
        console.error('Error during official approval:', err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await dbHelper.getAll('getUsers');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await dbHelper.get('getUser', { id: req.params.id })
        if (!user) return res.status(404).json({ message: 'User not found....' })
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, isAdmin } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        await dbHelper.exec('updateUser', { id: req.params.id, name, email, password: hashedPassword, isAdmin })

        res.json({ message: 'User successfully updated...' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await dbHelper.exec('deleteUser', { id: req.params.id })
        res.json({ message: 'User deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}




