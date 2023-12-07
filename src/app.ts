import express from 'express';
import connectDb from './config/db';
import authRouter from './routes/auth';
import pathRouter from './routes/path';
import canvasRouter from './routes/canvas';
import { authenticate } from './middleware/authMiddleware';
import userRouter from './routes/user';
import { errorHandler } from './middleware/errorHandlingMiddleware';
import cors from 'cors';

const app = express();
connectDb();
app.get('/', (req, res) => {
  res.send('Hello World !!');
});

app.use(express.json());
app.use(cors())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/path', authenticate, pathRouter);
app.use('/api/v1/user', authenticate, userRouter);
app.use('/api/v1/canvas', authenticate, canvasRouter);
app.use(errorHandler);
export default app;
