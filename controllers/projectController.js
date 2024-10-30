const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const project = new Project({ ...req.body, createdBy: req.user.userId });
    await project.save();
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({ createdBy: req.user.userId });
    res.json(projects);
};