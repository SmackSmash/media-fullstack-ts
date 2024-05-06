import express, { type Request, type Response } from 'express';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import axios from 'axios';
import userModel, { validateDeleteUser } from '../models/user';
import download from '../utils/download';
import keys from '../config/keys';

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
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const profileImg = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${keys.UNSPLASH_KEY}&query=profile`
    );

    console.log(profileImg.data.urls.small_s3);

    const imageId = randomUUID();

    await download(
      profileImg.data.urls.thumb,
      `./public/images/profile/${imageId}.jpg`
    );

    const response = await userModel.create({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      image: imageId
    });
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
    const { error } = validateDeleteUser.validate(req.params);

    if (error) {
      res.status(422).send({ error: error.details[0].message });
    } else {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        res.status(422).send({ error: `No user exists with ID of ${id}` });
      } else {
        const response = await userModel.deleteOne({ _id: id });
        res.status(200).send({ id, ...response });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
