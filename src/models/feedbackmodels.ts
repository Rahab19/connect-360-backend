export interface Feedback {
    id: string;
    title: string;
    description: string;
    usersid: string;
    createdAt: Date;
    updatedAt: Date;
    summary?: string;
  }