export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'citizen' | 'admin' | 'official';
  isEmailSent: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Payload {
    id: string;
    name: string;
    role: string;
    status:string;
    
  }

  