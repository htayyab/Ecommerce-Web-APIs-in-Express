import { body } from 'express-validator';

const updatePasswordValidation = [

    body('oldPassword')
        .trim()
        .notEmpty()
        .withMessage('Old password is required')
        .isLength({ min: 6 })
        .withMessage('Old password must be at least 6 characters long'),

    body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .custom((value, { req }) => {
            // Ensure the new password is not the same as the old password
            if (value === req.body.oldPassword) {
                throw new Error('New password must be different from the old password');
            }
            return true;
        }),
];

export default updatePasswordValidation;
