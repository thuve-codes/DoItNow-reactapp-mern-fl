import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";

const TaskForm = ({ onSuccess }) => {
  const { addTask } = useStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically set status based on due date
  useEffect(() => {
    if (formData.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(formData.dueDate);

      if (dueDate < today) {
        setFormData((prev) => ({ ...prev, status: "done" }));
      } else {
        setFormData((prev) => ({ ...prev, status: "todo" }));
      }
    }
  }, [formData.dueDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const taskToSend = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        due_date: formData.dueDate,
      };

      await addTask(taskToSend);

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "todo",
        dueDate: "",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding task:", error);
      setErrors({ submit: "Failed to add task" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Create Task</h3>

      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
          <input
            id="title"
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } p-2 w-full rounded`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            placeholder="Task description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border border-gray-300 p-2 w-full rounded"
            rows={3}
          />
        </div>

        {/* Due Date Field */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date *</label>
          <input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            className={`border ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            } p-2 w-full rounded`}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
          {formData.dueDate && (
            <p className="text-sm text-gray-600 mt-1">
              Status will be set to: {formData.status}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
