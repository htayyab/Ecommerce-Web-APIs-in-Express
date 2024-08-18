import Token from '../models/token.model.js';
import User from '../models/user.model.js';

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).send({ message: "Token is required" });
        }

        // Find the token in the database
        const tokenDoc = await Token.findOne({ token });
        if (!tokenDoc) {
            return res.status(400).send({ message: "Invalid or expired token" });
        }

        // Find the user associated with the token
        const user = await User.findById(tokenDoc.userId);
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        // Update the user's verification status 
        user.isVerified = true;
        await user.save();

        // Remove the token after verification
        await Token.findByIdAndDelete(tokenDoc._id);

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

export default verifyEmail;
