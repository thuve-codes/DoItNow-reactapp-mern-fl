const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', auth, getTasks);

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', auth, createTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, deleteTask);

module.exports = router;
