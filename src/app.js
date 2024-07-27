import express from 'express';
import connectDB from './config/dbConnect.js';
import routes from './routes/index.js';

const connection = await connectDB();

connection.on('error', (err) => {
    console.error('Connection error', err);
});

connection.once('open', () => {
    console.log('Database connected successfully');
});

const app = express();
routes(app);

export default app;