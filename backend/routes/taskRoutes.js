const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { createTask, getAllTasks, getTaskById, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const { generateAIInsights, saveAIInsights } = require('../controllers/aiController');

const router = express.Router();

router.use(protect);
router.post('/', restrictTo('Manager'), createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskStatus);
router.delete('/:id', restrictTo('Manager'), deleteTask);
router.post('/ai-optimize', generateAIInsights);
router.put('/:id/ai-update', saveAIInsights);

module.exports = router;
