import mongoose from 'mongoose';

interface Album {
  title: string;
  userId: {
    type: string;
    ref: mongoose.Types.ObjectId;
  };
}

const albumsSchema = new mongoose.Schema<Album>({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});
