import mongoose, { Schema } from 'mongoose';

const FacultySchema = new Schema({
  faculties_id: { type: String, required: true, unique: true },
  faculties_name: { type: String, required: true },
});

export default mongoose.model('Faculty', FacultySchema);