import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import keys from './config/keys';
import connect from './db/connect';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());
connect();

import usersRouter from './routes/users';
app.use('/users', usersRouter);
import albumsRouter from './routes/albums';
app.use('/albums', albumsRouter);

app.use(express.static('images'));

app.listen(keys.PORT, () => {
  console.log(`Server running on port ${keys.PORT}`);
});
