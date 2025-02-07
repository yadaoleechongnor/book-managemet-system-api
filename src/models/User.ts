import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  
  user_name: string;
  pass_word: string;
  email: string;
  student_code: string;
  phone_number: string;
  branch_id: string;
  year: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass_word: { type: String, required: true },
  student_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  branch_id: { type: String, required: true },
  year: { type: Number, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('pass_word')) return next();
  const salt = await bcrypt.genSalt(10);
  this.pass_word = await bcrypt.hash(this.pass_word, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.pass_word);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
