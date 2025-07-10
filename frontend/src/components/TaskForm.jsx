import React, { useState } from "react";
import useStore from "../store/useStore";

const TaskForm = () => {
  const { addTask } = useStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate) {
      alert("Title and Due Date are required.");
      return;
    }

    const newTask = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    addTask(newTask);
    setFormData({ title: "", description: "", status: "todo", dueDate: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <h3 className="text-xl font-semibold mb-3">Create Task</h3>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="border p-2 mb-3 w-full rounded"
        rows={3}
      />

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white font-medium py-2 rounded w-full hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
