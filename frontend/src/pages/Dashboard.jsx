import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../store/useStore";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { tasks, loading, fetchTasks } = useStore();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("due_date");
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;
    if (filter !== "all") {
      filtered = tasks.filter((task) => task.status === filter);
    }
    if (sort === "due_date") {
      filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    }
    return filtered;
  }, [tasks, filter, sort]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // clear token/session
    history.push("/login"); // redirect to login page
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <TaskForm />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <label htmlFor="filter" className="block text-sm font-semibold mb-1">
            Filter by status:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-semibold mb-1">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="due_date">Due Date</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredAndSortedTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
