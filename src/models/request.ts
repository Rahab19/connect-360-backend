// request.ts
import { Request } from 'express';
import { Payload } from '../models/authmodels';


export interface ExtendedRequest extends Request {
    info: Payload;
    usersid: string; 
  }

