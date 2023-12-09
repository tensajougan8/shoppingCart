import express from 'express';
import connectDb from './config/db';
import { authenticate } from './middleware/authMiddleware';
import { errorHandler } from './middleware/errorHandlerMiddleware';
import cors from 'cors';
import authRouter from './routes/authRoute';
import cartRouter from './routes/cartRoute';
import adminRouter from './routes/adminRoute';

const app = express();
connectDb();
app.get('/', (req, res) => {
  res.send('Hello World !!');
});

app.use(express.json());
app.use(cors())

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);
export default app;
