import express, { type Request, type Response } from 'express';
import singleModel, { validateDeleteSingle } from '../models/single';
import axios from 'axios';
import keys from '../config/keys';
import { randomUUID } from 'crypto';
import download from '../utils/download';
import { faker } from '@faker-js/faker';

const router = express.Router();

// @route   GET /singles/:albumId
// @desc    Get all singles for a specific album
// @access  Public
router.get('/:albumId', async (req: Request, res: Response) => {
  try {
    const response = await singleModel.find({ albumId: req.params.albumId });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @route   POST /singles/:albumId
// @desc    Add a single to an album
// @access  Public
router.post('/:albumId', async (req: Request, res: Response) => {
  try {
    const singleImg = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=${keys.UNSPLASH_KEY}&query=funky`
    );

    const imageId = randomUUID();

    await download(
      singleImg.data.urls.regular,
      `./public/images/singles/${imageId}.jpg`
    );

    const response = await singleModel.create({
      title: faker.music.songName(),
      albumId: req.params.albumId,
      image: imageId
    });

    res.send(response);

    // const response = await singleModel.create({ })
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
