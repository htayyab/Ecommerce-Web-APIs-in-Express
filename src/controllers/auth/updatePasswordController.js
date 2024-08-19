import mongoose from 'mongoose';
import { body } from "express-validator";
import bcrypt from 'bcryptjs';
import User from '../../models/user.model.js';
import Token from '../../models/token.model.js';

export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Old password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}
export const updatePasswordForm= async (req, res) => {
    const token = req.query.token;

    try {
        // Find the token in the database
        const tokenDocument = await Token.findOne({ token: token });

        if (!tokenDocument) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        // Check if the token has expired
        if (tokenDocument.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Token is valid and not expired
        res.status(200).json({ message: 'Token is valid', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


