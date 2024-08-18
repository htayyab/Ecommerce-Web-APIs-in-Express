import express from 'express';
import  register  from '../controllers/registerController.js';
import  login  from '../controllers/loginController.js';
import verifyEmail from '../controllers/verifyEmailController.js';


import {registerValidation, loginValidation } from '../middlewares/validations/registerValidation.js';
import handleValidationErrors  from '../utils/handleValidationErrors.js';


const router = express.Router();

router.post('/register',registerValidation,handleValidationErrors,register);

router.post('/login',loginValidation,handleValidationErrors,login);

router.get('/verify-email', verifyEmail);


export default router;