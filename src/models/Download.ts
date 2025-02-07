import mongoose, { Schema } from 'mongoose';

const DownloadSchema = new Schema({
 
  user_id: { type: String, required: true },
  book_id: { type: String, required: true },
  download_date: { type: Date, default: Date.now },
});

export default mongoose.model('Download', DownloadSchema);