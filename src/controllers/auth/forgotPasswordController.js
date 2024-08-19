import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import User from "../../models/user.model.js";
import Token from "../../models/token.model.js";
import crypto from 'crypto';
import sendVerificationEmail from '../../utils/sendVerificationEmail.js';


const forgetPassword=async(req,res)=>{
    const email=req.body.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        
        const verificationToken = new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes from now
        });
        
        await verificationToken.save();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Forgot Password',
            text: `Please click this link to update your password: 
            ${process.env.CLIENT_URL}/api/update-password?token=${verificationToken.token}`,
            html: `<p>Please verify your email by clicking the link below:</p>
            <a href="${process.env.CLIENT_URL}/api/update-password?token=${verificationToken.token}">Click here to update your password</a>`,
        };
        
    
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: "Password reset email sent successfully",
            user: {
                email: user.email,
            },
        });
    } catch (e) {
        res.status(500).json({ message: `Server error: ${e.message}` });
    }
};
export default forgetPassword;