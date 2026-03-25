import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
    type: 'experience' | 'education';
    roleOrDegree: string;
    organization: string; // Company or University
    startDate: Date;
    endDate?: Date; // If null, assume 'Present'
    location?: string;
    description: string;
    achievements: string[];
}

const experienceSchema = new Schema<IExperience>(
    {
        type: { type: String, enum: ['experience', 'education'], required: true },
        roleOrDegree: { type: String, required: true },
        organization: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        location: { type: String },
        description: { type: String },
        achievements: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);
