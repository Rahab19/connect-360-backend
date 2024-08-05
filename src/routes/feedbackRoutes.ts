import { Router } from 'express';
import { addFeedback, getFeedbacks, getFeedback, summarizeFeedback, updateFeedback,deleteFeedback } from '../controllers/feedbackcontroller';
import { verifyToken} from '../middlewares/authmiddlewares';


const feedbackRouter = Router();

feedbackRouter.post('/', verifyToken, addFeedback);
feedbackRouter.get('/', verifyToken, getFeedbacks);
feedbackRouter.get('/:id', verifyToken, getFeedback);
feedbackRouter.patch('/:id/summary', verifyToken, summarizeFeedback);
feedbackRouter.put('/:id', verifyToken, updateFeedback)
feedbackRouter.delete('/:id', verifyToken, deleteFeedback)

export default feedbackRouter;