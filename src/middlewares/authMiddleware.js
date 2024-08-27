import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthenticated user.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId).populate('role');
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
