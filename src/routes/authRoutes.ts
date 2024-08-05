import { Router } from 'express'
import { registerUser, login, getUsers, getUser, updateUser, deleteUser } from '../controllers/authcontrollers'
import { isAdmin, verifyToken} from '../middlewares/authmiddlewares'


const authRouter = Router()


authRouter.post('/register', registerUser)
authRouter.post('/login', login)
authRouter.get('/users',  getUsers)
authRouter.get('/users/:id', verifyToken,  getUser)
authRouter.put('/users/:id', verifyToken,  updateUser)
authRouter.delete('/users/:id', verifyToken, deleteUser)

export default authRouter