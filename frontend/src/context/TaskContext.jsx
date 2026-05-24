import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/axios';
import { toast } from 'react-hot-toast';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get('/tasks');
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      toast.error('Unable to load tasks');
    }
  };

  const createTask = async (payload) => {
    try {
      const response = await apiClient.post('/tasks', payload);
      if (response.data.success) {
        setTasks((current) => [response.data.data, ...current]);
        toast.success('Task created successfully');
      }
    } catch (error) {
      toast.error('Task creation failed');
      throw error;
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const response = await apiClient.put(`/tasks/${taskId}`, { status });
      if (response.data.success) {
        setTasks((current) => current.map((task) => (task._id === taskId ? response.data.data : task)));
        toast.success('Task status updated');
      }
    } catch (error) {
      toast.error('Could not update status');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      if (response.data.success) {
        setTasks((current) => current.filter((task) => task._id !== taskId));
        toast.success('Task deleted');
      }
    } catch (error) {
      toast.error('Could not delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        createTask,
        updateStatus,
        deleteTask,
        isCreateModalOpen,
        setIsCreateModalOpen
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};
