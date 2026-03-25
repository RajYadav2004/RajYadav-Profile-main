import express from 'express';
import {
    getBlogPosts,
    getBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getAllBlogPostsAdmin
} from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getBlogPosts)
    .post(protect, createBlogPost);

router.get('/admin', protect, getAllBlogPostsAdmin);

router.route('/:slug')
    .get(getBlogPost);

router.route('/:id')
    .put(protect, updateBlogPost)
    .delete(protect, deleteBlogPost);

export default router;
