import User from "../../models/user.model.js";
import Token from "../../models/token.model.js";
import crypto from 'crypto';
import sendForgotPasswordEmail from '../../utils/sendForgotPasswordEmail.js';

const forgetPassword = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        const verificationToken = new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
            expiresAt: Date.now() + 2 * 60 * 1000,
        });

        await verificationToken.save();

        await sendForgotPasswordEmail(email, verificationToken.token);

        res.status(200).json({
            message: "Password reset email sent successfully",
            user: {
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export default forgetPassword;
