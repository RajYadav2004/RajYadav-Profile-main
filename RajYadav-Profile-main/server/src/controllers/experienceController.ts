import { Request, Response } from 'express';
import { Experience } from '../models/Experience';

export const getExperience = async (req: Request, res: Response) => {
    try {
        const experience = await Experience.find({}).sort({ startDate: -1 });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    try {
        const experience = new Experience(req.body);
        const createdExperience = await experience.save();
        res.status(201).json(createdExperience);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (experience) {
            await experience.deleteOne();
            res.json({ message: 'Experience removed' });
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
