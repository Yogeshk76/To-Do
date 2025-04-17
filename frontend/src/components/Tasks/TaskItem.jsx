// src/components/Tasks/TaskItem.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const TaskItem = ({ task, onUpdate }) => {
  const { token } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/tasks/${task._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      onUpdate(); // refresh task list
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(); // refresh task list
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-gray-700">{task.description}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
