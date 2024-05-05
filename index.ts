import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import keys from './config/keys';
import connect from './db/connect';
import usersRouter from './routes/users';

dotenv.config();

const app: Express = express();

app.use(express.json());

connect();

app.use('/users', usersRouter);

app.listen(keys.PORT, () => {
  console.log(`Server running on port ${keys.PORT}`);
});
