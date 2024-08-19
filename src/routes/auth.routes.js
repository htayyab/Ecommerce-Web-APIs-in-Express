import express from 'express';
import  register  from '../controllers/auth/registerController.js';
import  login  from '../controllers/auth/loginController.js';
import verifyEmail from '../controllers/auth/verifyEmailController.js';
import {updatePassword, updatePasswordForm }from '../controllers/auth/updatePasswordController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {registerValidation, loginValidation } from '../middlewares/validations/registerValidation.js';
import updatePasswordValidation from "../middlewares/validations/updatePasswordValidation.js";
import handleValidationErrors  from '../utils/handleValidationErrors.js';
import forgetPassword from '../controllers/auth/forgotPasswordController.js';




const router = express.Router();

router.post('/register',registerValidation,handleValidationErrors,register);

router.post('/login',loginValidation,handleValidationErrors,login);

router.get('/verify-email', verifyEmail);
router.get('/update-password',updatePasswordForm);

router.put('/update-password', authMiddleware, updatePasswordValidation, handleValidationErrors, updatePassword);
router.post('/forgot-password',forgetPassword );


export default router;