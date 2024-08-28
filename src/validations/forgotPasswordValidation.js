import { body } from 'express-validator';

const forgotPasswordValidation = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

export default forgotPasswordValidation;
