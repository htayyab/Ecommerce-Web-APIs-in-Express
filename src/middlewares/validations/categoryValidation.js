import {body, param} from 'express-validator';

export const addCategoryValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters long'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
        .isLength({ max: 200 }).withMessage('Description must be less than 200 characters long')
];

export const getCategoryValidation = [
    param('id')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid Category ID format')
];