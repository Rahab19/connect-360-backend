import { Router } from 'express';
import { createIncident, getIncidents, getIncident, updateIncident, deleteIncident } from '../controllers/incidentscontroller';
import { verifyToken } from '../middlewares/authmiddlewares';

const incidentRouter = Router();

incidentRouter.post('/', verifyToken, createIncident);
incidentRouter.get('/', verifyToken, getIncidents);
incidentRouter.get('/:id', verifyToken, getIncident);
incidentRouter.put('/:id', verifyToken, updateIncident);
incidentRouter.delete('/:id', verifyToken, deleteIncident);

export default incidentRouter;