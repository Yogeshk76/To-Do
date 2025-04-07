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

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update task (with ownership check)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete task (with ownership check)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne(); 
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
