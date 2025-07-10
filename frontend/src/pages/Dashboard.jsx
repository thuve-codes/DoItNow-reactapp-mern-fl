import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../store/useStore";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import {
  FiLogOut,
  FiPlus,
  FiFilter,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";

const Dashboard = () => {
  const { tasks, loading, fetchTasks } = useStore();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("due_date");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter((task) => task.status === filter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sort === "due_date") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sort === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      filtered.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    return filtered;
  }, [tasks, filter, sort, searchQuery]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const taskCountByStatus = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        acc.total++;
        return acc;
      },
      { total: 0 }
    );
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <MdOutlineDashboard className="text-3xl text-indigo-600" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Task Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                {taskCountByStatus.total} tasks in total
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
              <FiPlus /> New Task
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition border border-gray-200 shadow-sm"
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500">To Do</h3>
            <p className="text-2xl font-semibold">
              {taskCountByStatus.todo || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500">In Progress</h3>
            <p className="text-2xl font-semibold">
              {taskCountByStatus["in-progress"] || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500">Done</h3>
            <p className="text-2xl font-semibold">
              {taskCountByStatus.done || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500">Total</h3>
            <p className="text-2xl font-semibold">
              {taskCountByStatus.total || 0}
            </p>
          </div>
        </div>

        {/* Task Form (conditional) */}
        {showTaskForm && (
          <div className="mb-8 animate-fadeIn">
            <TaskForm onSuccess={() => setShowTaskForm(false)} />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300">
              <FiFilter className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300">
              <FiCalendar className="text-gray-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent focus:outline-none"
              >
                <option value="due_date">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? "Try a different search term"
                : "Create a new task to get started"}
            </p>
            <button
              onClick={() => setShowTaskForm(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + Add New Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
