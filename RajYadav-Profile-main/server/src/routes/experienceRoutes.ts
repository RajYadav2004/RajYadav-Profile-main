import express from 'express';
import { getExperience, createExperience, deleteExperience } from '../controllers/experienceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getExperience)
    .post(protect, createExperience);

router.route('/:id')
    .delete(protect, deleteExperience);

export default router;
