import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Customer from '../models/customer.model.js';

const register = async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create and save the new user
        const user = new User({
            email,
            password: hashedPassword,
        });
        const savedUser = await user.save();

        // Create and save the customer
        const customer = new Customer({
            user: savedUser._id, // Use the saved user's _id
            firstName,
            lastName,
        });
        await customer.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        // Respond with success
        res.status(201).json({ message: 'User registered successfully' });

    } catch (e) {
        res.status(500).json({ message: `Server error: ${e.message}` });
    }
}

const login = (req, res) => {

}

export default { register, login };
