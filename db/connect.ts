import mongoose from 'mongoose';
import keys from '../config/keys';

const connect = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI!);
    console.log('DB connected');
  } catch (error: unknown) {
    console.error(error);
  }
};

export default connect;
