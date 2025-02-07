import express from 'express';
import { createSubjectDepartment, deleteSubjectDepartment, getAllSubjectDepartments, updateSubjectDepartment } from '../controllers/subjectDepartmentController';


const router = express.Router();


router.post('/create', createSubjectDepartment );
router.get('/get', getAllSubjectDepartments);
router.put('/:id', updateSubjectDepartment);
router.delete('/:id', deleteSubjectDepartment);


export default router;