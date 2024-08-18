import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import Customer from "../../models/customer.model.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email }).select("+password");
        if (!userExists) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: userExists._id, email: userExists.email, role:userExists.role},
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        // Set the token as an HttpOnly cookie in the response
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: userExists._id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                phone: userExists.phone,
                token,
                role:userExists.role
            },
        });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export default login;
