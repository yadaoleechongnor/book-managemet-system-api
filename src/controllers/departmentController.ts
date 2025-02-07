import { Request, Response } from 'express';
import Department from '../models/Department';

export const createDepartment = async (req: Request, res: Response) => {
  const { department_id, department_name, faculties_id } = req.body;
  try {
    const newDepartment = new Department({ department_id, department_name, faculties_id });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating department' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating department' });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting department' });
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching departments' });
  }
};