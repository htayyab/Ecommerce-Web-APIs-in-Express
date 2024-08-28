import {body, param} from 'express-validator';
import Category from "../models/category.model.js";

export const addCategoryValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .isLength({min: 3, max: 50}).withMessage('Name must be between 3 and 50 characters long'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
        .isLength({max: 200}).withMessage('Description must be less than 200 characters long')
];

export const getCategoryValidation = [
    param('id')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid Category ID format')
];

export const updateCategoryValidation = [
    param('id')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid Category ID format'),

    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .isLength({min: 3, max: 50}).withMessage('Name must be between 3 and 50 characters long')
        .custom(async (value, {req}) => {
            const existingCategory = await Category.findOne({name: value});
            if (existingCategory && existingCategory._id.toString() !== req.params.id.toString()) {
                throw new Error('Category name already exists');
            }
            return true;
        }),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .trim()
        .isLength({max: 200}).withMessage('Description must be less than 200 characters long')
];

export const deleteCategoryValidation = [
     param('id')
        .notEmpty()
        .withMessage('Category ID is required')
        .isMongoId()
        .withMessage('Invalid Category ID format'),
];
