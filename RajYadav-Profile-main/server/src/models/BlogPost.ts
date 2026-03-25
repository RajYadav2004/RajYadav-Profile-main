import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    tags: string[];
    published: boolean;
}

const blogPostSchema = new Schema<IBlogPost>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true }, // Markdown content
        coverImage: { type: String },
        tags: [{ type: String }],
        published: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
