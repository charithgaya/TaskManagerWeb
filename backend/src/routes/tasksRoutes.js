import express from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/auth/task/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createTask);
router.get('/tks', protect, getTasks);
router.get('/tk/:id', protect, getTask);
router.patch('/tk/:id', protect, updateTask);
router.delete('/tk/:id', protect, deleteTask);

console.log("Task route loaded");

export default router;