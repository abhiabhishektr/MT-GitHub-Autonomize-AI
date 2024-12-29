import * as dotenv from "dotenv";

dotenv.config();

interface Env {
    MONGODB_URI: string;
    JWT_SECRET: string;
    PORT: number;
    NODE_ENV: string;
}

export const env: Env = {
    MONGODB_URI: process.env.NODE_ENV === 'development'
        ? 'mongodb://localhost:27017'
        : process.env.MONGODB_URI || 'mongodb://localhost:27017',
    JWT_SECRET: process.env.JWT_SECRET || 'github.com/abhiabhishektr',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    NODE_ENV: process.env.NODE_ENV || 'development'
};


