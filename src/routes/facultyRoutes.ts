import express from 'express';
import { createFaculty, deleteFaculty, getAllFaculties, updateFaculty } from '../controllers/facultyController';


const router = express.Router();

router.post('/create', createFaculty);
router.get('/get', getAllFaculties);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);


export default router;