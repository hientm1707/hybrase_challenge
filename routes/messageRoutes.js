const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to send a new message in a project
router.post('/:projectId/send', authMiddleware, messageController.sendMessage);

// Route to get all messages for a specific project
router.get('/:projectId', authMiddleware, messageController.getMessages);

module.exports = router;