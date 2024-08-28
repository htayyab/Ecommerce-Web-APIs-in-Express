import express from 'express';
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import {addCategoryValidation, getCategoryValidation,updateCategoryValidation, deleteCategoryValidation} from '../validations/categoryValidations.js';
import {getAllCategories, addCategory, getCategoryById, updateCategoryById, deleteCategory} from '../controllers/categoryController.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/create', authorizeMiddleware('create', 'category'), addCategoryValidation, handleValidationErrors, addCategory);
router.get('/:id', authorizeMiddleware('read', 'category'), getCategoryValidation, handleValidationErrors, getCategoryById);
router.put('/:id',authorizeMiddleware('edit', 'category'),updateCategoryValidation, handleValidationErrors, updateCategoryById);
router.delete('/:id', authorizeMiddleware('delete','category'),deleteCategoryValidation, handleValidationErrors, deleteCategory);

export default router;
