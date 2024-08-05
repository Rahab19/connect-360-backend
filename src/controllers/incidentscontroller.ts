import { Request, Response } from 'express';
import DbHelper from '../database helpers';
import { v4 as uid } from 'uuid';

const dbHelper = new DbHelper();

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await dbHelper.getAll('GetIncidents');
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getIncident = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    const incident = await dbHelper.get('GetIncident', { incidentId });
    if (!incident) {
      res.status(404).json({ error: 'Incident not found' });
    } else {
      res.json(incident);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createIncident = async (req: Request, res: Response) => {
  try {
    const id = uid()
    const { usersid, title, description, mediaUrl, reportedBy } = req.body;
    await dbHelper.exec('CreateIncident', { id:id, usersid, title, description, mediaUrl, reportedBy });
    res.status(201).json({ message: 'Incident created successfully' });
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const updateIncident = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    const { title, description, mediaUrl, status } = req.body;
    await dbHelper.exec('UpdateIncident', { incidentId, title, description, mediaUrl, status });
    res.json({ message: 'Incident updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteIncident = async (req: Request, res: Response) => {
  try {
    const incidentId = req.params.id;
    await dbHelper.exec('DeleteIncident', { incidentId });
    res.json({ message: 'Incident deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};