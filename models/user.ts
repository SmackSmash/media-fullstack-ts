import mongoose from 'mongoose';
import Joi from 'joi';
interface User {
  name: string;
  email: string;
  image: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true }
});

export const validateDeleteUser = Joi.object().keys({
  id: Joi.string().min(3)
});

export default mongoose.model<User>('users', userSchema);
