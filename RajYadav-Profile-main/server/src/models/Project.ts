import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    techStack: string[];
    role: string;
    responsibilities: string[];
    links: {
        github?: string;
        liveDemo?: string;
        videoDemo?: string;
    };
    images: string[];
    category: string;
    status: 'active' | 'archived' | 'in-progress';
    featured: boolean;
}

const projectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        shortDescription: { type: String, required: true },
        longDescription: { type: String, required: true },
        techStack: [{ type: String }],
        role: { type: String, required: true },
        responsibilities: [{ type: String }],
        links: {
            github: { type: String },
            liveDemo: { type: String },
            videoDemo: { type: String },
        },
        images: [{ type: String }],
        category: { type: String, required: true },
        status: { type: String, enum: ['active', 'archived', 'in-progress'], default: 'active' },
        featured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
