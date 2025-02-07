import mongoose, { Schema } from 'mongoose';

const DepartmentSchema = new Schema({
  department_name: { type: String, required: true },
  faculties_id: { type: String, required: true },
});

export default mongoose.model('Department', DepartmentSchema);