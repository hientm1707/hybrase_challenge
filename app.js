const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const messageRoutes = require('./routes/messageRoutes');
const aiRoutes = require('./routes/aiRoutes');

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

// Existing middleware and routes...

// Handle real-time updates
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newMessage', (message) => {
        // Broadcast the new message to all connected clients
        const userMessage = req.body.message; // Get the user message from the request body
        // Here you would implement your NLP model processing (e.g., using a library or API)
        let botResponse = ''

        if (userMessage.toLowerCase().includes('project')) {
            botResponse = "Can you specify which project you are referring to?";
        } else if (userMessage.toLowerCase().includes('task')) {
            botResponse = "What task do you need information on?";
        } else {
            botResponse = "I'm sorry, I didn't understand your question.";
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