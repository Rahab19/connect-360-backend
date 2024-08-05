// poll.routes.ts
import { Router } from 'express';
import { createPoll, getPolls, getPoll, updatePoll, deletePoll, closePoll, createPollResponse, getPollResponses, getPollResults } from '../controllers/pollscontroller';
import { verifyToken } from '../middlewares/authmiddlewares';

const pollRouter = Router();

pollRouter.post('/', verifyToken, createPoll);
pollRouter.get('/', verifyToken, getPolls);
pollRouter.get('/:id', verifyToken, getPoll);
pollRouter.put('/:id', verifyToken, updatePoll);
pollRouter.delete('/:id', verifyToken, deletePoll);
pollRouter.post('/:id/close', verifyToken, closePoll);
pollRouter.post('/:id/response', verifyToken, createPollResponse);
pollRouter.get('/:id/responses', verifyToken, getPollResponses);
pollRouter.get('/:id/results', verifyToken, getPollResults);

export default pollRouter;