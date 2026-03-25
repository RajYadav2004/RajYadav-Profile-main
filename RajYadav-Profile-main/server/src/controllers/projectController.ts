import { Request, Response } from 'express';
import { Project } from '../models/Project';

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single project
// @route   GET /api/v1/projects/:slug
// @access  Public
export const getProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response) => {
    try {
        const project = new Project(req.body);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: 'Invalid project data', error });
    }
};

// @desc    Update a project
// @route   PUT /api/v1/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            Object.assign(project, req.body);
            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
