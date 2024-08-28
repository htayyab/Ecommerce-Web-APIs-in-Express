import express from 'express';
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import {addCategoryValidation, getCategoryValidation,updateCategoryValidation} from '../validations/categoryValidation.js';
import {getAllCategories, addCategory, getCategoryById,updateCategory,deleteCategory} from '../controllers/categoryController.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/create', authorizeMiddleware('create', 'category'), addCategoryValidation, handleValidationErrors, addCategory);
router.get('/:id', authorizeMiddleware('read', 'category'), getCategoryValidation, handleValidationErrors, getCategoryById);
router.put('/:id', authorizeMiddleware('update', 'category'), updateCategoryValidation, handleValidationErrors, updateCategory);
router.delete('/:id', authorizeMiddleware('delete', 'category'), deleteCategory);

export default router;
