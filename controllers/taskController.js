const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new task in a project
router.post('/:projectId/create', authMiddleware, taskController.createTask);

// Route to get all tasks for a specific project
router.get('/:projectId', authMiddleware, taskController.getTasks);

// Route to update a specific task
router.put('/:taskId', authMiddleware, taskController.updateTask);

// Route to delete a specific task
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;