import { User } from "./authmodels";

export interface Poll {
    id: string;
    title: string;
    description: string;
    question:string;
    yesCount: number;
    noCount: number;
    option:string,
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isActive: true
  }
  
  export interface PollResponse {
    id: string;
    pollId: string;
    userId: string;
    response: 'yes' | 'no';
    createdAt: Date;
  }