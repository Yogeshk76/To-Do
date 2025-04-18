import {Task} from '../models/task.model.js';
import { validationResult } from 'express-validator';

const createTask = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }  

  const {title, description} = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user._id,
    });

    await newTask.save();

    res.status(201).json({
      message: 'Task created successfully',
      success: true,
      task: newTask,
    });
    console.log(newTask);

  }
  catch(error) {
    res.status(500).json({
      message: 'Error creating task',
      success: false,
      error,
    });
  }
}

const getTasks = async (req, res) => {
  const {completed} = req.query;
  const query = {user : req.user._id};

  if (completed !== undefined) {
    query.completed = completed === 'true';
  }

  try {
    const tasks = await Task.find(query);
    res.status(200).json({
      message: 'Tasks fetched successfully',
      success: true,
      tasks,
    });
    
  }
  catch(error) {
    res.status(500).json({
      message: 'Error fetching tasks',
      success: false,
      error,
    });
  }
};

const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { title, description, completed } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
        success: false,
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to update this task',
        success: false,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    res.status(200).json({
      message: 'Task updated successfully',
      success: true,
      task: updatedTask,
    });
  }
  catch (error) {
    res.status(500).json({
      message: 'Error updating task',
      success: false,
      error,
    });
  }
};


const deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          message: 'Task not found',
          success: false,
        });
      }

      if (task.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: 'Not authorized to delete this task',
          success: false,
        });
      }

      await Task.deleteOne({ _id: id });

      res.status(200).json({
        message: 'Task deleted successfully',
        success: true,
      });
    }
    catch(error) {
      console.log(error)
      res.status(500).json({
        message: 'Error deleting task',
        success: false,
        error,
      });
    }

  }



  export {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }