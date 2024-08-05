import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';
import  Jwt  from 'jsonwebtoken';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let config = {
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
};

function createTransporter(config: any) {
  return nodemailer.createTransport(config);
}
// function generatePasswordResetToken(user: { id: string, email: string }) {
//     const payload = {
//       userId: user.id,
//       email: user.email,
//     };

async function sendEmail(messageOptions: any) {
  let transporter = createTransporter(config);
  await transporter.verify();

  transporter.sendMail(messageOptions, (err: any, info: any) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
}

export async function sendRegisterEmail(user: { name: string, email: string }) {
  ejs.renderFile(
    path.resolve(__dirname, '../../templates/register.ejs'),
    { name: user.name },
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let messageOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Welcome to Citizen connect360',
        html: data,
      };

      await sendEmail(messageOptions);
    }
  );
}

export async function sendPasswordResetEmail(user: {  id: string, email: string}) {
  const token = generatePasswordResetToken(user); // implement token generation logic
  const resetUrl = `http://example.com/reset-password/${token}`; // change this api

  ejs.renderFile(
    path.resolve(__dirname, '../../templates/password-reset.ejs'),
    { id: user.id, resetUrl },
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let messageOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Reset Your Password',
        html: data,
      };

      await sendEmail(messageOptions);
    }
  );
}

function generatePasswordResetToken(user: { id: string, email: string }) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

}
