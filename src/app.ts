// src/app.ts
import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import loanRoutes from './routes/loan.route'
import loanTypeRoutes from './routes/loanType.route';
import loanExtrasRoutes from "./routes/loan.extras.route"
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());



app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/loans', loanRoutes);
app.use('/api/v1/loan-types',loanTypeRoutes);
app.use('/api/v1/loan-extras', loanExtrasRoutes);


app.use(errorHandler); 


// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});



export default app;
