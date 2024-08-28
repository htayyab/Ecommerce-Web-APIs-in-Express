import express from 'express';
import register from '../controllers/auth/registerController.js';
import login from '../controllers/auth/loginController.js';
import verifyEmail from '../controllers/auth/verifyEmailController.js';
import forgetPassword from '../controllers/auth/forgotPasswordController.js';
import updatePassword from '../controllers/auth/updatePasswordController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {registerValidation, loginValidation} from '../validations/registerValidation.js';
import updatePasswordValidation from "../validations/updatePasswordValidation.js";
import handleValidationErrors  from '../utils/handleValidationErrors.js';
import logout from '../controllers/auth/logoutController.js';
import forgotPasswordValidation from "../validations/forgotPasswordValidation.js"



const router = express.Router();

router.post('/register',registerValidation,handleValidationErrors,register);

router.post('/login',loginValidation,handleValidationErrors,login);
router.post('/logout',logout );

router.get('/verify-email', verifyEmail);
router.post('/forgot-password',forgotPasswordValidation,handleValidationErrors,forgetPassword);
router.put('/update-password', authMiddleware, updatePasswordValidation, handleValidationErrors, updatePassword);
router.post('/logout', authMiddleware, logout); 

export default router;