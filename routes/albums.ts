import express, { type Request, type Response } from 'express';
import albumModel from '../models/album';
import { faker } from '@faker-js/faker';

const router = express.Router();

// @route   POST /albums
// @desc    Add an album attached to a user
// @access  Public
router.post('/:userId', async (req: Request, res: Response) => {
  console.log(req.params);
  const response = await albumModel.create({
    title: faker.music.songName(),
    userId: req.params.userId
  });
  res.send(response);
});

export default router;
