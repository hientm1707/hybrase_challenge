const Message = require('../models/Message');

// Controller to send a message in a specific project
exports.sendMessage = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { content } = req.body;

        const message = new Message({
            projectId,
            sender: req.user.userId,  // assuming `userId` is available via authMiddleware
            content,
        });

        await message.save();
        res.status(201).json({ message: 'Message sent', data: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to retrieve all messages for a specific project
exports.getMessages = async (req, res) => {
    try {
        const { projectId } = req.params;
        const messages = await Message.find({ projectId }).populate('sender', 'username');

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};