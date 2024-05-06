import mongoose from 'mongoose';
import Joi from 'joi';
interface User {
  name: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true }
});

export const validateDeleteUser = Joi.object().keys({
  id: Joi.string().min(3)
});

export default mongoose.model<User>('users', userSchema);
