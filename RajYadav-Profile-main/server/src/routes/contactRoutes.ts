import express from 'express';
import { submitContact, getMessages, markAsRead } from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(submitContact)
    .get(protect, getMessages);

router.route('/:id/read').put(protect, markAsRead);

export default router;
