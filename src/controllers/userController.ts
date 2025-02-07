import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { user_id, user_name, pass_word, email, student_code, phone_number, branch_id, year } = req.body;
  try {
    const newUser = new User({ user_id, user_name, pass_word, email, student_code, phone_number, branch_id, year });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   const { email, pass_word } = req.body;
//   try {
//     const user = await User.findOne({ email, pass_word });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// };
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
  }
}
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  };
  
  export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  };