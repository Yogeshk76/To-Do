import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticateUser); 

router.get('/', getTasks); // Get all tasks for the logged-in user
router.post('/', createTask); // Create a new task for the logged-in user
router.put('/:id', updateTask); // Update task (with ownership check)
router.delete('/:id', deleteTask); // Delete task (with ownership check)

export default router;