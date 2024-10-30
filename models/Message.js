const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);