import express from 'express';
const router = express.Router();
import { createTask, getTasks, updateTask, deleteTask} from '../controllers/task.controller.js';
import authenticateUser from '../middlewares/auth.middleware.js';

router.use(authenticateUser);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;