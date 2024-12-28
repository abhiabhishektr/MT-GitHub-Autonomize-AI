// src/app.ts

import express from 'express';
import errorHandler from './middlewares/errorHandler';
// import { rateLimiter } from './middlewares/rateLimiter';
import { connectDB } from './config/db';
import { env } from './config/env';
import logger from './middlewares/logger';
import cors from "cors";

const app = express();
const PORT = env.PORT;

connectDB();

const corsOptions = {
    origin: '*',
    methods: ['GET'],
};

app.use(cors(corsOptions));

// app.use(express.json());
// app.use(rateLimiter);
app.use(logger);



app.get('/test', (req, res) => {
    res.send('test')
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
