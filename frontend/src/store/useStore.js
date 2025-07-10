
import {create} from 'zustand';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const useStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const response = await getTasks();
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  addTask: async (taskData) => {
    set({ loading: true });
    try {
      const response = await createTask(taskData);
      set((state) => ({ tasks: [...state.tasks, response.data], loading: false }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
  editTask: async (id, taskData) => {
    set({ loading: true });
    try {
      const response = await updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? response.data : task)),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
  removeTask: async (id) => {
    set({ loading: true });
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useStore;
