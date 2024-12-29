
import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
    try {
        console.log("env.MONGODB_URI: ", env.MONGODB_URI);
        await mongoose.connect(`${env.MONGODB_URI}/MT-Github-Autonomize`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
