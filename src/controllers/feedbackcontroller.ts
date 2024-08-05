import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import  DbHelper from '../database helpers'
import { User } from '../models/authmodels';
import { ExtendedRequest } from '../models/request';
import { Feedback } from '../models/feedbackmodels';

const dbHelper = new DbHelper();

// Add Feedback
export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const id = uuidv4();
    const usersid = (req as ExtendedRequest).info.id; // cast req to ExtendedRequest

    if (!usersid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }// assuming req.user is the authenticated user

    await dbHelper.exec('addFeedback', { id, title, description, usersid });

    res.status(201).json({ message: 'Feedback added successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await dbHelper.getAll('getFeedbacks');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await dbHelper.get('getFeedback', { id: req.params.id });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    await dbHelper.exec('updateFeedback', { id: req.params.id, title, description });

    res.json({ message: 'Feedback updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  const usersid = (req as ExtendedRequest).info.id;
  if (!usersid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }// assuming req.user is the authenticated user
  try {
    await dbHelper.exec('deleteFeedback', { id: req.params.id });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// export const summarizeFeedback = async (req: Request, res: Response) => {
//     try {
//       const feedback = await dbHelper.get('getFeedback', { id: req.params.id });
//       if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  
//       const summary = generateSummary(feedback.description);
//       await dbHelper.exec('updateFeedbackSummary', { id: req.params.id, summary });
  
//       res.json({ message: 'Feedback summarized successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   };

//   const generateSummary= async(text: string) =>{
//     const completion = await open.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content: `${prompt} ${text}`,
//         },
//       ],
//       model: 'gpt-3.5-turbo',
//     });
//     return completion.choices[0].message;
//   }
  
  export const summarizeFeedback = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const summary = await dbHelper.exec('summarizeFeedback', { id });
  
      res.json({ message: 'Feedback summarized successfully', summary });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };


