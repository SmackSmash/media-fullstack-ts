import mongoose from 'mongoose';

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

export default mongoose.model<Album>('albums', albumsSchema);
