```markdown
# Hybrase Challenge

Welcome to the Hybrase Challenge repository! This project is a project management application that includes user authentication, project and task management, and AI features for information retrieval and chatbot functionality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Projects](#projects)
  - [Tasks](#tasks)
  - [AI Features](#ai-features)
- [Usage Examples](#usage-examples)
- [Database Schema](#database-schema)
- [Real-Time Features](#real-time-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can register, log in, and manage their accounts.
- **Project Management**: Create, retrieve, update, and delete projects.
- **Task Management**: Create, assign, and manage tasks associated with projects.
- **AI Features**: 
  - Information retrieval from a knowledge base.
  - Chatbot functionality to answer user queries regarding projects and tasks.
- **Real-Time Data Processing**: Receive real-time updates for tasks and messages.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Socket.IO**: For real-time communication.
- **JWT**: For secure user authentication.
- **Axios**: For making HTTP requests.

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v18.4.0 or later)
- MongoDB (or access to a MongoDB server)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hientm1707/hybrase_challenge.git
   cd hybrase_challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start your MongoDB server (if not using Docker):
   ```bash
   mongod
   ```

2. Start the application:
   ```bash
   npm start
   ```

3. The application will be available at `http://localhost:3000`.

### Docker Setup (Optional)

To run the application using Docker, make sure you have Docker installed and run the following command:

```bash
docker-compose up --build
```

This will build the Docker containers and start the application.

## API Endpoints

### Authentication

- **POST /api/auth/register**
    - Register a new user.
    - **Request Body**:
      ```json
      {
        "username": "exampleUser",
        "password": "examplePassword"
      }
      ```
    - **Response**:
        - **201 Created**: User registered successfully.
        - **400 Bad Request**: Validation errors.

- **POST /api/auth/login**
    - Log in a user and retrieve a JWT.
    - **Request Body**:
      ```json
      {
        "username": "exampleUser",
        "password": "examplePassword"
      }
      ```
    - **Response**:
        - **200 OK**: Login successful, returns a JWT.
        - **401 Unauthorized**: Invalid credentials.

### Projects

- **GET /api/projects**
    - Retrieve all projects for the authenticated user.
    - **Response**:
        - **200 OK**: Returns an array of projects.

- **POST /api/projects**
    - Create a new project.
    - **Request Body**:
      ```json
      {
        "title": "New Project Title",
        "description": "This is a description of the new project."
      }
      ```
    - **Response**:
        - **201 Created**: Project created successfully.
        - **400 Bad Request**: Validation errors.

- **GET /api/projects/:projectId**
    - Retrieve a specific project.
    - **Response**:
        - **200 OK**: Returns the project data.
        - **404 Not Found**: Project not found.

- **PUT /api/projects/:projectId**
    - Update a specific project.
    - **Request Body**:
      ```json
      {
        "title": "Updated Project Title",
        "description": "Updated description."
      }
      ```
    - **Response**:
        - **200 OK**: Project updated successfully.
        - **404 Not Found**: Project not found.

- **DELETE /api/projects/:projectId**
    - Delete a specific project.
    - **Response**:
        - **200 OK**: Project deleted successfully.
        - **404 Not Found**: Project not found.

### Tasks

- **GET /api/projects/:projectId/tasks**
    - Retrieve all tasks within a project.
    - **Response**:
        - **200 OK**: Returns an array of tasks.

- **POST /api/projects/:projectId/tasks**
    - Create a new task within a project.
    - **Request Body**:
      ```json
      {
        "title": "New Task Title",
        "assignedTo": "UserID",
        "status": "in-progress",
        "dueDate": "2024-12-31"
      }
      ```
    - **Response**:
        - **201 Created**: Task created successfully.

- **PUT /api/tasks/:taskId**
    - Update a specific task.
    - **Request Body**:
      ```json
      {
        "title": "Updated Task Title",
        "status": "completed"
      }
      ```
    - **Response**:
        - **200 OK**: Task updated successfully.
        - **404 Not Found**: Task not found.

- **DELETE /api/tasks/:taskId**
    - Delete a specific task.
    - **Response**:
        - **200 OK**: Task deleted successfully.
        - **404 Not Found**: Task not found.

### AI Features

- **GET /api/ai/query**
    - Query the knowledge base.
    - **Request Parameters**: `query` (string)
    - **Response**:
        - **200 OK**: Returns the retrieved information.

- **POST /api/ai/chatbot**
    - Send a message to the chatbot.
    - **Request Body**:
      ```json
      {
        "message": "What is the project status?"
      }
      ```
    - **Response**:
        - **200 OK**: Returns the chatbot's response.

## Usage Examples

### Example cURL command for creating a project

```bash
curl -X POST http://localhost:3000/api/projects \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
-d '{
    "title": "New Project Title",
    "description": "This is a description of the new project."
}'
```

### Example cURL command for creating a task

```bash
curl -X POST http://localhost:3000/api/projects/<PROJECT_ID>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
-d '{
    "title": "New Task Title",
    "assignedTo": "USER_ID",
    "status": "in-progress",
    "dueDate": "2024-12-31"
}'
```

## Database Schema

### User Schema
```javascript
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
```

### Project Schema
```javascript
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});
```

### Task Schema
```javascript
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
});
```

## Real-Time Features

The application supports real-time data updates through Socket.IO. You can listen for events such as new messages or task updates from the server. This enhances user experience by providing immediate feedback and updates.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
```

Feel free to copy and paste this Markdown code