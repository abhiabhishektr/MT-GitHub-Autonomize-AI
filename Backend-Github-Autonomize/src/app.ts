// Backend-Github-Autonomize/src/app.ts
import express from 'express';
import { connectDB } from './config/db';
import { env } from './config/env';
import cors from "cors";
import logger from './middlewares/logger';
import githubRoutes from './routes/githubRoutes';
import errorHandler from './middlewares/errorHandler';
import { limiter } from './middlewares/rateLimiter';
import helmet from 'helmet';

const app = express();
const PORT = env.PORT;

connectDB();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use(limiter);

app.use('/api', githubRoutes);

app.get('/test', (req, res) => {
    res.send('Test route working');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
