import express from 'express';
import connectDB from './config/dbConnect.js';
import routes from './routes/index.js';
import handling404 from './middlewares/handling404.js';
import errorHandling from './middlewares/errorHandling.js';

const connection = await connectDB();

connection.on('error', (err) => {
  console.error('Connection error', err);
});

connection.once('open', () => {
  console.log('Database connected successfully');
});

const app = express();
routes(app);

app.use(handling404);
app.use(errorHandling);

export default app;
