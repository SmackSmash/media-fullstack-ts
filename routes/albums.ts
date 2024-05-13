import express, { type Request, type Response } from 'express';
import albumModel from '../models/album';
import { faker } from '@faker-js/faker';
import { validateDeleteAlbum } from '../models/album';

const router = express.Router();

// @route   GET /albums
// @desc    Get all albums
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await albumModel.find();
    res.send(response);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

// @route   GET /albums/:userId
// @desc    Get all albums by specific user
// @access  Public
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const response = await albumModel.find({ userId: req.params.userId });
    res.send(response);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

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

// @route   DELETE /albums/:albumId
// @desc    Delete an album by album ID
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = validateDeleteAlbum.validate(req.params);

    if (error) {
      res.status(422).send({ error: error.details[0].message });
    } else {
      const { id } = req.params;

      const album = await albumModel.findById(id);

      if (!album) {
        res.status(422).send({ error: `No album exists with ID of ${id}` });
      } else {
        const response = await albumModel.deleteOne({ _id: id });
        res.send({ id, ...response });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
