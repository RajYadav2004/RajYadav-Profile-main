import express from 'express';
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

router.route('/:slug')
    .get(getProject);

router.route('/:id')
    .put(protect, updateProject)
    .delete(protect, deleteProject);

export default router;
