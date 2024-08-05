import express, {json} from 'express';
import feedbackRouter from './routes/feedbackRoutes';
import authRouter from './routes/authRoutes';
import pollRouter from './routes/pollRoutes';
import cors from 'cors'
import incidentRouter from './routes/incidentsRoutes';

const app = express();

app.use(json())
app.use(cors())


app.use('/view',feedbackRouter)
app.use('/auth',authRouter)
app.use('/poll',pollRouter)
app.use('/incident',incidentRouter)





app.listen(4000,()=>{
    console.log('Server Running...')
})


