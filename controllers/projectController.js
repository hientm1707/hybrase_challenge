const Project = require('../models/Project');

// Controller to create a new project
exports.createProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body, createdBy: req.user.userId });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Controller to get all projects for the authenticated user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.userId });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
};