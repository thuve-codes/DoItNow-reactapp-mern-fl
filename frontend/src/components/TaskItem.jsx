import React, { useState } from "react";
import useStore from "../store/useStore";

const TaskItem = ({ task }) => {
  const { editTask, removeTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...task });

  const handleEdit = () => {
    const updatedTask = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    };
    editTask(task._id, updatedTask);
    setIsEditing(false);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border p-2 mb-2 w-full"
            placeholder="Title"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border p-2 mb-2 w-full"
            placeholder="Description"
          />
          <input
            type="date"
            value={formatDateForInput(formData.dueDate)}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleEdit} className="bg-green-500 text-white p-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due: {formatDate(task.dueDate)}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white p-2 mt-2"
          >
            Edit
          </button>
          <button
            onClick={() => removeTask(task._id)}
            className="bg-red-500 text-white p-2 mt-2 ml-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
