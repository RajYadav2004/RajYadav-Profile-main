import express from 'express';
import { getSkills, createSkill, deleteSkill } from '../controllers/skillController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getSkills)
    .post(protect, createSkill);

router.route('/:id')
    .delete(protect, deleteSkill);

export default router;
