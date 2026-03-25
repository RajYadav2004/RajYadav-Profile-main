import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    subject?: string;
    message: string;
    read: boolean;
}

const contactMessageSchema = new Schema<IContactMessage>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
