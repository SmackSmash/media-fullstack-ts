import express, { type Request, type Response } from 'express';
import { faker } from '@faker-js/faker';
import userModel from '../models/user';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await userModel.find();
    res.status(200).send(response);
  } catch (error) {}
  res.status(200).send('Get users');
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const response = await userModel.create({ name: faker.person.fullName() });
    res.status(200).send(response);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

export default router;
