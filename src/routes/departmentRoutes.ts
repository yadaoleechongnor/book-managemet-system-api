

import express from 'express';
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from '../controllers/departmentController';



const router = express.Router();

router.post('/create', createDepartment);
router.get('/get', getAllDepartments);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

export default router;