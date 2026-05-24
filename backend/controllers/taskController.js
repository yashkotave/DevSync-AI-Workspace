const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, assignedTo, isPublic } = req.body;
  if (!title || !description || !priority || !assignedTo) {
    return res.status(400).json({ success: false, message: 'All fields are required to create a task', data: null });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    createdBy: req.user._id,
    isPublic: Boolean(isPublic)
  });

  const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email role avatar').populate('createdBy', 'name');
  res.status(201).json({ success: true, message: 'Task created successfully', data: populatedTask });
});

const getPublicTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ isPublic: true })
    .populate('assignedTo', 'name email role avatar')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
  res.json({ success: true, message: 'Public tasks retrieved successfully', data: tasks });
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
    .populate('assignedTo', 'name email role avatar')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({ success: true, message: 'Tasks retrieved successfully', data: tasks });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email role avatar')
    .populate('createdBy', 'name email');

  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found', data: null });
  }

  res.json({ success: true, message: 'Task retrieved successfully', data: task });
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status, title, description, priority, assignedTo, isPublic } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found', data: null });
  }

  if (status) task.status = status;
  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  if (assignedTo) task.assignedTo = assignedTo;
  if (typeof isPublic !== 'undefined') task.isPublic = Boolean(isPublic);

  await task.save();
  const populated = await Task.findById(task._id).populate('assignedTo', 'name email role avatar').populate('createdBy', 'name');
  res.json({ success: true, message: 'Task updated successfully', data: populated });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found', data: null });
  }
  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted successfully', data: null });
});

module.exports = { createTask, getPublicTasks, getAllTasks, getTaskById, updateTaskStatus, deleteTask };
