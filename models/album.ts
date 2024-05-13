import mongoose from 'mongoose';
import Joi from 'joi';

interface Album {
  title: string;
  userId: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
}

const albumsSchema = new mongoose.Schema<Album>({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

export const validateDeleteAlbum = Joi.object().keys({
  id: Joi.string().min(3)
});

export default mongoose.model<Album>('albums', albumsSchema);
