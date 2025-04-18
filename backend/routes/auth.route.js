import express from 'express';
const router = express.Router();

import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../validations/auth.validation.js';


router.post('/register',registerValidation, registerUser);

router.post('/login',loginValidation, loginUser);

router.delete('/logout', logoutUser);


export default router;