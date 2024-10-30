const Task = require('../models/Task');

// Controller to create a task within a project
exports.createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, assignedTo, status, dueDate } = req.body;

        const task = new Task({
            title,
            projectId,
            assignedTo,
            status,
            dueDate,
        });

        await task.save();
        res.status(201).json({ message: 'Task created', data: task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get all tasks within a project
exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ projectId }).populate('assignedTo', 'username');

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update a specific task
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;

        const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated', data: task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a specific task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};