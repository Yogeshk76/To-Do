import {body} from 'express-validator';

export const registerValidation = [
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({min: 6}),
];

export const loginValidation = [
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({min: 6}),
];