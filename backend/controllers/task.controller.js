import {Task} from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const task = new Task({
      title,
      description,
      user: req.user._id, 
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
    
  } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };