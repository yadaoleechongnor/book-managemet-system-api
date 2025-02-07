import express from 'express';
import {  registerUser, loginUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController';

const router = express.Router();

// Explicitly specifying the request handler type
router.post('/register', registerUser);
router.post('/login', loginUser as express.RequestHandler); 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

export default router;
