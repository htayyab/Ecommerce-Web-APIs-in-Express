import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import Customer from "../../models/customer.model.js";
import Role from "../../models/role.model.js";
import Token from "../../models/token.model.js";
import crypto from 'crypto';
import sendVerificationEmail from '../../utils/sendVerificationEmail.js';

const register = async (req, res) => {
    const {firstName, lastName, email, password, confirmPasssword ,phone} = req.body;

    try {
        const [userExists, roleExists] = await Promise.all([
            User.findOne({ email }),
            Role.findOne({ name: 'user' })
        ]);

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!roleExists) {
            return res.status(400).json({ message: "Default role not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create and save the new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            roles : roleExists._id
        });
        const savedUser = await user.save();

        // Create and save the customer
        const customer = new Customer({
            userId: savedUser._id,
        });
        await customer.save();

        // Generate JWT token
        const token = jwt.sign(
            {userId: savedUser._id, email: savedUser.email},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

       //  Send email verification
       const verificationToken = new Token({
        userId: savedUser._id,
        token: crypto.randomBytes(16).toString("hex"),
    });
    await verificationToken.save();
    await sendVerificationEmail(savedUser.email, verificationToken.token);


        // Set cookie in the response
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).send({
            message: "User registered successfully",
            user: {
                _id: savedUser._id,
                email: savedUser.email,
                firstName,
                lastName,
                phone,
                role:roleExists.name,
                token,
            },
        });
        
    } catch (error) {
        res.status(500).send({message: `Server error: ${error.message}`});
    }
};

export default register;
