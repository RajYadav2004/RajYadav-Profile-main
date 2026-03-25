import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';

// @desc    Submit a contact message
// @route   POST /api/v1/contact
// @access  Public
export const submitContact = async (req: Request, res: Response) => {
    try {
        const message = new ContactMessage(req.body);
        const createdMessage = await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Get all messages
// @route   GET /api/v1/contact
// @access  Private/Admin
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const message = await ContactMessage.findById(req.params.id);
        if (message) {
            message.read = true;
            await message.save();
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
