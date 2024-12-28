// Backend-Github-Autonomize/src/middlewares/rateLimiter.ts// src/middlewares/rateLimiter.ts

import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 1000,  
    max: 100,             
    message: 'Too many requests, please try again later.',
});
