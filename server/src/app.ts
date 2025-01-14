import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes';

const app: Application = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', routes);

export default app;
