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
    console.log(req.query, req.params, req.body);
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
    const {title, description, completed} = req.body;
    const {id} = req.params;

    try {
      const task = await Task.findByIdAndUpdate(id);

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

      if (title) task.title = title;
      if (description) task.description = description;
      if (completed !== undefined) task.completed = completed;

      await task.save();
      res.status(200).json({
        message: 'Task updated successfully',
        success: true,
        task,
      });
    }
    catch(error) {
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

      await task.remove();

      res.status(200).json({
        message: 'Task deleted successfully',
        success: true,
      });
    }
    catch(error) {
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