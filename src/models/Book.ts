import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  branch_id: { type: String, required: true },
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  book_file: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
});

export default mongoose.model('Book', BookSchema);