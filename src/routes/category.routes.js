import express from 'express';
import { addCategoryValidation, getCategoryValidation } from '../validations/categoryValidation.js';
import {getAllCategories, addCategory, getCategoryById} from '../controllers/categoryController.js';
import handleValidationErrors  from '../utils/handleValidationErrors.js';


const router = express.Router();

router.get('/', getAllCategories);
router.post('/create', addCategoryValidation,handleValidationErrors,addCategory);
router.get('/:id',getCategoryValidation,handleValidationErrors,getCategoryById);

export default router;
