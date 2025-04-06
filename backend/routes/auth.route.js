import express from 'express';
const router = express.Router();

import { registerUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';

router.post('/register', registerUser);

router.post('/login', loginUser);


export default router;
