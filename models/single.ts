import mongoose from 'mongoose';
import Joi from 'joi';

interface Single {
  title: string;
  image: string;
  albumId: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
}

const singleSchema = new mongoose.Schema<Single>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'albums'
  }
});

export const validateDeleteSingle = Joi.object().keys({
  id: Joi.string().min(3)
});

export default singleSchema;
