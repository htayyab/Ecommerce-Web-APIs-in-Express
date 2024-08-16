import {body} from 'express-validator';

export const registerValidation = [

    // Validate and sanitize firstName
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .trim()
        .escape()
        .isLength({min: 1})
        .withMessage('First name must be at least 1 character long'),

    // Validate and sanitize lastName
    body('lastName')
        .optional()
        .trim()
        .escape()
        .isLength({max: 100})
        .withMessage('Last name can be up to 100 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    // Validate and sanitize password
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),

    // Confirm password
    body('confirmPassword')
        .custom((value, {req}) => value === req.body.password)
        .withMessage('Passwords do not match'),
];

export const loginValidation = [

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),
];
