import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { BlogPost } from '../models/BlogPost';
import { ContactMessage } from '../models/ContactMessage';
import { connectDB } from '../config/db';

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Project.deleteMany();
        await BlogPost.deleteMany();
        await ContactMessage.deleteMany();

        // Create Admin User
        await User.create({
            name: 'Raj Yadav',
            email: 'ry191111989@gmail.com',
            passwordHash: '191111989',
            role: 'admin',
        });

        // Create Sample Projects
        await Project.create([
            {
                title: 'Portfolio Website',
                slug: 'portfolio-website',
                shortDescription: 'A professional portfolio website built with React and Node.js.',
                longDescription: 'This project is a full-featured portfolio website designed to showcase developer skills and projects. It includes a custom-built CMS (Admin Panel) for managing content dynamically.',
                techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                role: 'Full Stack Developer',
                responsibilities: ['UI/UX Design', 'Backend API Development', 'Database Modeling'],
                links: {
                    github: 'https://github.com/RajYadav2004/RajYadav-Profile',
                    liveDemo: 'http://localhost:5173'
                },
                images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'],
                category: 'Web Development',
                status: 'active',
                featured: true
            },
            {
                title: 'E-commerce App',
                slug: 'ecommerce-app',
                shortDescription: 'A full-stack e-commerce application with payment integration.',
                longDescription: 'A scalable e-commerce platform with features like product filtering, shopping cart, and secure checkout using Stripe integration.',
                techStack: ['Next.js', 'Express', 'Stripe', 'Redis'],
                role: 'Backend Developer',
                responsibilities: ['Payment Integration', 'API Optimization', 'Security Implementation'],
                links: {
                    github: 'https://github.com',
                    liveDemo: 'https://example.com'
                },
                images: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80'],
                category: 'Full Stack',
                status: 'in-progress',
                featured: false
            }
        ]);

        // Create Sample Blogs
        await BlogPost.create([
            {
                title: 'Getting Started with TypeScript',
                slug: 'getting-started-with-typescript',
                excerpt: 'Learn the basics of TypeScript and how it can improve your DX.',
                content: 'TypeScript is a strongly typed programming language that builds on JavaScript...',
                coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80',
                tags: ['TypeScript', 'JavaScript'],
                published: true
            }
        ]);

        // Create Sample Messages
        await ContactMessage.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Inquiry about project',
                message: 'Hello, I loved your portfolio! Are you available for freelance work?',
            }
        ]);

        console.log('Sample Data Imported Successfully!');
        process.exit();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        process.exit(1);
    }
};

importData();
