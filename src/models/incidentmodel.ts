export interface Incident {
  id: string;
  usersid: string;
  title: string;
  description: string;
  mediaUrl?: string;
  status: string;
  createdAt: Date;
  reportedBy: string;
}