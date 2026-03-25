import { Request, Response } from 'express';
import { Skill } from '../models/Skill';

export const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await Skill.find({}).sort({ category: 1, level: -1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createSkill = async (req: Request, res: Response) => {
    try {
        const skill = new Skill(req.body);
        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            await skill.deleteOne();
            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
