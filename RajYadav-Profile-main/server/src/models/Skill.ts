import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';
    level: number; // 0-100 or 1-5
    icon?: string;
}

const skillSchema = new Schema<ISkill>(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        level: { type: Number, default: 0 },
        icon: { type: String },
    },
    {
        timestamps: true,
    }
);

export const Skill = mongoose.model<ISkill>('Skill', skillSchema);
