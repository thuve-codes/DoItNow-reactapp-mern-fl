
import React, { useState } from 'react';
import useStore from '../store/useStore';

const TaskItem = ({ task }) => {
  const { editTask, removeTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...task });

  const handleEdit = () => {
    editTask(task._id, formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <textarea
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
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border p-2 mb-2 w-full"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleEdit} className="bg-green-500 text-white p-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 ml-2">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 mt-2">
            Edit
          </button>
          <button onClick={() => removeTask(task._id)} className="bg-red-500 text-white p-2 mt-2 ml-2">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
