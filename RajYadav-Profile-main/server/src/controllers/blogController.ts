import { Request, Response } from 'express';
import { BlogPost } from '../models/BlogPost';

// @desc    Get all blog posts
// @route   GET /api/v1/blog
// @access  Public
export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all blog posts (Admin)
// @route   GET /api/v1/blog/admin
// @access  Private
export const getAllBlogPostsAdmin = async (req: Request, res: Response) => {
    try {
        const posts = await BlogPost.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single blog post
// @route   GET /api/v1/blog/:slug
// @access  Public
export const getBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a blog post
// @route   POST /api/v1/blog
// @access  Private/Admin
export const createBlogPost = async (req: Request, res: Response) => {
    try {
        const post = new BlogPost(req.body);
        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Update a blog post
// @route   PUT /api/v1/blog/:id
// @access  Private/Admin
export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findById(req.params.id);

        if (post) {
            Object.assign(post, req.body);
            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/v1/blog/:id
// @access  Private/Admin
export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findById(req.params.id);

        if (post) {
            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
