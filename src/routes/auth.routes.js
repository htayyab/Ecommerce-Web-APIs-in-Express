import express from 'express';
import { register, login } from '../controllers/authController.js';
import registerValidation from '../middlewares/validations/registerValidation.js';

const router = express.Router();

router.post('/register',registerValidation,register);

export default router;