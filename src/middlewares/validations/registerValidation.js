import { body } from 'express-validator';

export const registerValidation = [
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .trim()
        .escape(),

    // Validate and sanitize lastName
    body('lastName')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 100 })
        .withMessage('Last name can be up to 100 characters long'),

    // Validate email
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    // Validate and sanitize password
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),

    // Confirm password
    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    // Validate phone number if provided
    body('phone')
        .optional()
        .matches(/^\+\d{12}$/)
        .withMessage('Incorrect format in the format,exactly 12 digits after the plus sign'),
];


export const loginValidation = [

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),
];
