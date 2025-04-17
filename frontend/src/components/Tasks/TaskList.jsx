// src/components/Tasks/TaskList.jsx
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate }) => {
  if (!tasks.length) {
    return <p className="text-gray-500">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TaskList;
