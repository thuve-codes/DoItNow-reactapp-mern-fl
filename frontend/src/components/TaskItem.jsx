import React, { useState } from "react";
import useStore from "../store/useStore";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";

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
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const formatDateForInput = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      {isEditing ? (
        <div className="p-4">
          <div className="space-y-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
            />

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description"
              rows={3}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(formData.dueDate)}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                <FiX className="mr-1" /> Cancel
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <FiSave className="mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace("-", " ")}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Due: {formatDate(task.dueDate)}
          </div>

          <div className="flex justify-end space-x-2 border-t pt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition"
            >
              <FiEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={() => removeTask(task._id)}
              className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
            >
              <FiTrash2 className="mr-1" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
