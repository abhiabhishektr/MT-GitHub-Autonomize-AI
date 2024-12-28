// middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); // for debugging

  const status = err.status || 500; // default to 500
  const message = err.message || 'Internal Server Error'; // default error message

  // logger.error(`${err.message} - ${req.originalUrl} - ${req.method}`); use when record needed also use 'winston'

  // Send formatted error response  
  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
