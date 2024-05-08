import express, { type Request, type Response } from 'express';
import albumModel from '../models/album';
import { faker } from '@faker-js/faker';

const router = express.Router();

// @route   GET /albums
// @desc    Get all albums
// @access  Public
router.get('/', async (req: Request, res: Response) => {});

// @route   POST /albums
// @desc    Add an album attached to a user
// @access  Public
router.post('/:userId', async (req: Request, res: Response) => {
  try {
    const response = await albumModel.create({
      title: faker.music.songName(),
      userId: req.params.userId
    });
    res.send(response);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

export default router;
