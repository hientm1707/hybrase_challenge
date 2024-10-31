const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
const { NlpManager } = require('@nlpjs/basic');

// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const messageRoutes = require('./routes/messageRoutes');
const aiRoutes = require('./routes/aiRoutes');
const Project = require("./models/Project");
const Task = require("./models/Task");


dotenv.config();
db.connect(); // Initialize MongoDB connection

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);


const server = http.createServer(app);
const io = socketIo(server);

// Initialize NLP Manager
const manager = new NlpManager({ languages: ['en'] });

// Add intents and responses
manager.addDocument('en', 'I have a project', 'project.query');
manager.addDocument('en', 'Tell me about the project', 'project.query');
manager.addDocument('en', 'I need information on a task', 'task.query');
manager.addDocument('en', 'What task do I need to do', 'task.query');

manager.addAnswer('en', 'project.query', 'Can you specify which project you are referring to?');
manager.addAnswer('en', 'task.query', 'What task do you need information on?');
manager.addAnswer('en', 'None', "I'm sorry, I didn't understand your question.");


// Train the model
(async () => {
    await manager.train();
    manager.save();
})();


// Handle real-time updates
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newMessage', async (userMessage) => {
        // Broadcast the new message to all connected clients
        const response = await manager.process('en', userMessage);
        let  botResponse = response.answer;

        if (response.intent === 'project.query') {
            try {
                const projects = await Project.find({ createdBy: socket.handshake.query.userId });
                botResponse = projects.length ? `Project details: ${JSON.stringify(projects)}` : 'No projects found.';
            } catch (error) {
                console.error('Error fetching projects:', error.message);
                botResponse = 'Failed to retrieve projects.';
            }
        } else if (response.intent === 'task.query') {
            try {
                const tasks = await Task.find({ createdBy: socket.handshake.query.userId });
                botResponse = tasks.length ? `Task details: ${JSON.stringify(tasks)}` : 'No tasks found.';
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
                botResponse = 'Failed to retrieve tasks.';
            }
        }

        io.emit('message', botResponse);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});