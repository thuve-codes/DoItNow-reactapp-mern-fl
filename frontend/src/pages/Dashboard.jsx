
import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { tasks, loading, fetchTasks } = useStore();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due_date');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks
    .filter((task) => filter === 'all' || task.status === filter)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <TaskForm />
      <div className="flex justify-between mb-4">
        <div>
          <label>Filter by status: </label>
          <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label>Sort by: </label>
          <select onChange={(e) => setSort(e.target.value)} className="border p-2">
            <option value="due_date">Due Date</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
