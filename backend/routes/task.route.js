import express from 'express';
const router = express.Router();
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';


router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;