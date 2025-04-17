import {Task} from '../models/task.model.js';

const createTask = async (req, res) => {
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
  