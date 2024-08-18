import express from 'express';
import { register, login } from '../controllers/authController.js';
import {registerValidation, loginValidation } from '../middlewares/validations/registerValidation.js';
import handleValidationErrors  from '../utils/handleValidationErrors.js';


const router = express.Router();

router.post('/register',registerValidation,handleValidationErrors,register);

router.post('/login',loginValidation,handleValidationErrors,login);

export default router;