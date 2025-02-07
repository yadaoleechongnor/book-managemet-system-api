import { Request, Response } from 'express';
import Faculty from '../models/Faculty';

export const createFaculty = async (req: Request, res: Response) => {
  const { faculties_id, faculties_name } = req.body;
  try {
    const newFaculty = new Faculty({ faculties_id, faculties_name });
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(500).json({ error: 'Error creating faculty' });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedFaculty);
  } catch (error) {
    res.status(500).json({ error: 'Error updating faculty' });
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Faculty.findByIdAndDelete(id);
    res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting faculty' });
  }
};

export const getAllFaculties = async (req: Request, res: Response) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching faculties' });
  }
};