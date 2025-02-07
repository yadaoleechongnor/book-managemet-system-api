import { Request, Response } from 'express';
import Download from '../models/Download';

export const createDownload = async (req: Request, res: Response) => {
  const { download_id, user_id, book_id } = req.body;
  try {
    const newDownload = new Download({ download_id, user_id, book_id });
    await newDownload.save();
    res.status(201).json(newDownload);
  } catch (error) {
    res.status(500).json({ error: 'Error creating download record' });
  }
};

export const updateDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedDownload = await Download.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedDownload);
  } catch (error) {
    res.status(500).json({ error: 'Error updating download record' });
  }
};

export const deleteDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Download.findByIdAndDelete(id);
    res.status(200).json({ message: 'Download record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting download record' });
  }
};

export const getAllDownloads = async (req: Request, res: Response) => {
  try {
    const downloads = await Download.find();
    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching download records' });
  }
};