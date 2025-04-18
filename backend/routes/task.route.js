import express from 'express';
const router = express.Router();
import { createTask, getTasks, updateTask, deleteTask} from '../controllers/task.controller.js';
import authenticateUser from '../middlewares/auth.middleware.js';
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.js';

router.use(authenticateUser);

router.post('/',createTaskValidation, createTask);

router.get('/', getTasks);

router.put('/:id',updateTaskValidation, updateTask);

router.delete('/:id', deleteTask);


export default router;