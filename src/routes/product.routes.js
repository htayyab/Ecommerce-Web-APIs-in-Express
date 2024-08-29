import express from 'express';
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import {addProductValidation,deleteProductValidation,getProductValidation,updateProductValidation } from '../validations/productValidations.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';
import {addProduct,getAllProducts,getProductById,deleteProduct,updateProductById} from "../controllers/productController.js"

const router = express.Router();
router.get('/', getAllProducts);
router.post('/create', authorizeMiddleware('create', 'product'), addProductValidation, handleValidationErrors, addProduct);
router.get('/:id', authorizeMiddleware('read', 'category'), getProductValidation, handleValidationErrors, getProductById);
router.put('/:id',authorizeMiddleware('edit', 'category'),updateProductValidation, handleValidationErrors, updateProductById);
router.delete('/:id', authorizeMiddleware('delete','category'),deleteProductValidation, handleValidationErrors, deleteProduct);



export default router;
