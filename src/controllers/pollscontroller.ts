// pollsController.ts
import { Request, Response } from 'express';
import DbHelper from '../database helpers';
import { v4 as uuidv4 } from 'uuid';
import { ExtendedRequest } from '../models/request';

const dbHelper = new DbHelper();

export const createPoll = async (req: Request, res: Response) => {
  try {
    const { title, description, question, options } = req.body;
    await dbHelper.exec('CreatePoll', { title, description, question, options });
    res.json({ message: 'Poll created successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPolls = async (req: Request, res: Response) => {
  try {
    const polls = await dbHelper.getAll('GetPolls');
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPoll = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    const poll = await dbHelper.get('GetPoll', { pollId });
    if (!poll) {
      res.status(404).json({ error: 'Poll not found' });
    } else {
      res.json(poll);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePoll = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    const { title, description, question, options } = req.body;
    await dbHelper.exec('UpdatePoll', { pollId, title, description, question, options });
    res.json({ message: 'Poll updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePoll = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    await dbHelper.exec('DeletePoll', { pollId });
    res.json({ message: 'Poll deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const closePoll = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    await dbHelper.exec('ClosePoll', { pollId });
    res.json({ message: 'Poll closed successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPollResponse = async (req: Request, res: Response) => {
  try {
    const { pollId, userId, response } = req.body;
    const existingResponse = await dbHelper.get('GetPollResponse', { pollId, userId });
    if (existingResponse) {
      res.status(400).json({ error: 'You have already voted in this poll' });
    } else {
      await dbHelper.exec('CreatePollResponse', { pollId, userId, response });
      res.json({ message: 'Poll response created successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPollResponses = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    const responses = await dbHelper.getAll('GetPollResponses', { pollId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPollResults = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.id;
    const results = await dbHelper.getAll('GetPollResults', { pollId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};