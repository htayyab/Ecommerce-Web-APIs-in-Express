import express from 'express';
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import {addCategoryValidation, getCategoryValidation} from '../validations/categoryValidation.js';
import {getAllCategories, addCategory, getCategoryById} from '../controllers/categoryController.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/create', authorizeMiddleware('create', 'category'), addCategoryValidation, handleValidationErrors, addCategory);
router.get('/:id', authorizeMiddleware('read', 'category'), getCategoryValidation, handleValidationErrors, getCategoryById);


export default router;
