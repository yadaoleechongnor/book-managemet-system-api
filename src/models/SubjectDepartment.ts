import mongoose, { Schema } from 'mongoose';

const SubjectDepartmentSchema = new Schema({
  subject_department_name: { type: String, required: true },
  department_id: { type: String, required: true },
});

export default mongoose.model('SubjectDepartment', SubjectDepartmentSchema);