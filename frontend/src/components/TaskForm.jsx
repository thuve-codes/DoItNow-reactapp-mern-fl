
import React, { useState } from 'react';
import useStore from '../store/useStore';

const TaskForm = () => {
  const { addTask } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    due_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setFormData({ title: '', description: '', status: 'todo', due_date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-xl mb-2">Create Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="date"
        value={formData.due_date}
        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
