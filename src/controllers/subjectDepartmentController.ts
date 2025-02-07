import { Request, Response } from 'express';
import SubjectDepartment from '../models/SubjectDepartment';

export const createSubjectDepartment = async (req: Request, res: Response) => {
  const { subject_department_id, subject_department_name, department_id } = req.body;
  try {
    const newSubjectDepartment = new SubjectDepartment({ subject_department_id, subject_department_name, department_id });
    await newSubjectDepartment.save();
    res.status(201).json(newSubjectDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subject department' });
  }
};

export const updateSubjectDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedSubjectDepartment = await SubjectDepartment.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedSubjectDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating subject department' });
  }
};

export const deleteSubjectDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await SubjectDepartment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subject department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subject department' });
  }
};

export const getAllSubjectDepartments = async (req: Request, res: Response) => {
  try {
    const subjectDepartments = await SubjectDepartment.find();
    res.status(200).json(subjectDepartments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subject departments' });
  }
};