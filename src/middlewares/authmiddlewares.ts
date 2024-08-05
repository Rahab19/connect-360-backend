import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Payload, User } from '../models/authmodels'

dotenv.config()

export interface ExtendedRequest extends Request {
  info?: Payload
}

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Forbidden' })
    }

    const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload
    req.info = decodedData
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Invalid Token' })
  }
}



// export function isAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
//   if (req.info?.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Admin access required' });
//   }
// }

export function isUser(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.id === req.params.id || req.info?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
}

export function isAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete users' });
  }

  const userId = req.params.id;
  // Call your user deletion logic here, e.g. update user status to "deleted"
  // For example:
  // User.updateOne({ _id: userId }, { $set: { deleted: true } });

  res.status(200).json({ message: `User with ID ${userId} has been soft deleted` });
}


export function isrole(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.role) {
    next()
  } else {
    res.status(403).json({ message: ' access required' })
  }
}

export function isuser(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.id === req.params.id || req.info?.role) {
    next()
  } else {
    res.status(403).json({ message: 'Access denied' })
  }
}