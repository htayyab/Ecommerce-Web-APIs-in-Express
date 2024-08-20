import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const sendVerificationEmail = async (email, token) => {
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
        subject: 'Email Verification',
        text: `Please verify your email by clicking the link: 
        ${process.env.CLIENT_URL}/verify-email?token=${token}`,
        html: `<p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.CLIENT_URL}/api/verify-email?token=${token}">Verify Email</a>`,
    };
    
    await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
