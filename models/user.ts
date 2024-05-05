import mongoose from 'mongoose';

interface User {
  name: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true }
});

export default mongoose.model<User>('users', userSchema);
