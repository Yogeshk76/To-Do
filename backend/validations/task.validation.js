import {body} from 'express-validator';

export const createTaskValidation = [
  body('title', 'Title is required').notEmpty(),
  body('description').optional().isString(),
  body('completed').optional().isBoolean(),
];

export const updateTaskValidation = [
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('completed').optional().isBoolean(),
];
