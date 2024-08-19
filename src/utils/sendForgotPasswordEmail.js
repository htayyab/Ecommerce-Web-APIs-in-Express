import nodemailer from 'nodemailer';

const sendForgotPasswordEmail = async (email, token) => {
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
        ${process.env.CLIENT_URL}/api/update-password?token=${token}`,
        html: `<p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.CLIENT_URL}/api/update-password?token=${token}">Click here to update your password</a>`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendForgotPasswordEmail;
