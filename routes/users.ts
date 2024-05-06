import express, { type Request, type Response } from 'express';
import { faker } from '@faker-js/faker';
import userModel, { validateDeleteUser } from '../models/user';

const router = express.Router();

// @route   GET /users
// @desc    Get all users
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await userModel.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send('Get users');
  }
});

// @route   POST /users
// @desc    Add a user
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  try {
    const response = await userModel.create({ name: faker.person.fullName() });
    res.status(200).send(response);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

// @route   DELETE /users/:id
// @desc    Delete a user by id
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = await validateDeleteUser.validateAsync(req.params);

    if (error) {
      console.log(error);
      res.status(422).send({ error: error.details });
    }

    const { id } = req.params;

    const response = await userModel.deleteOne({ _id: id });
    res.status(200).send({ id, ...response });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
