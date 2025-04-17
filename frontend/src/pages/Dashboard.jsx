import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";

const Dashboard = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      {/* Form to create a task */}
      <TaskForm onTaskCreated={fetchTasks} />

      {/* Loading state */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      )}
    </div>
  );
};

export default Dashboard;
