import { Request, Response } from 'express';
import Book from '../models/Book';
import cloudinary from '../utils/cloudinary';
import Department from '../models/Department';
import SubjectDepartment from '../models/SubjectDepartment';

export const uploadBook = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            branch_id: req.body.branch_id,
            year: req.body.year,
            abstract: req.body.abstract,
            book_file: result.secure_url,
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error });
    }
};

// export const searchBooks = async (req: Request, res: Response): Promise<void> => {
//     const { name, faculties, departments, subject_departments } = req.query;
//     try {
//         const query: any = {};
//         if (name) query.title = { $regex: name, $options: 'i' };
//         if (faculties) query.branch_id = faculties;
//         if (departments) query.branch_id = departments;
//         if (subject_departments) query.branch_id = subject_departments;

//         const books = await Book.find(query);
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ error: 'Error searching books' });
//     }
// };
export const searchBooks = async (req: Request, res: Response) => {
    const { name, faculties, departments, subject_departments } = req.query;
    try {
      const query: any = {};
  
      // Search by book name
      if (name) query.title = { $regex: name, $options: 'i' };
  
      // Search by faculty (find departments under the faculty, then books in those departments)
      if (faculties) {
        const departmentsInFaculty = await Department.find({ faculty_id: faculties });
        const departmentIds = departmentsInFaculty.map(d => d._id);
        query.branch_id = { $in: departmentIds };
      }
  
      // Search by department
      if (departments) query.branch_id = departments;
  
      // Search by subject department (find department linked to subject, then books)
      if (subject_departments) {
        const subjectDepartment = await SubjectDepartment.findById(subject_departments);
        if (subjectDepartment) query.branch_id = subjectDepartment.department_id;
      }
  
      const books = await Book.find(query).populate('branch_id');
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error searching books' });
    }
  };
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: 'Error updating book' });
    }
  };
  
  export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Book.findByIdAndDelete(id);
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting book' });
    }
  };
  
  export const getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching books' });
    }
  };
  
//   export const searchBooks = async (req: Request, res: Response) => {
//     const { name, faculties, departments, subject_departments } = req.query;
//     try {
//       const query: any = {};
//       if (name) query.title = { $regex: name, $options: 'i' };
//       if (faculties) query.branch_id = faculties;
//       if (departments) query.branch_id = departments;
//       if (subject_departments) query.branch_id = subject_departments;
  
//       const books = await Book.find(query);
//       res.status(200).json(books);
//     } catch (error) {
//       res.status(500).json({ error: 'Error searching books' });
//     }
//   };