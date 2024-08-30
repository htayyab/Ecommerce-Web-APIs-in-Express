import express from 'express';
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";
import handleValidationErrors from '../utils/handleValidationErrors.js';
import { addOrder,getOrderById,getAllOrders,updateOrder,deleteOrder } from '../controllers/orderController.js';
import { addOrderValidation,getOrderValidation,updateOrderValidation,deleteOrderValidation } from '../validations/orderValidations.js';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/create', authorizeMiddleware('create', 'order'), addOrderValidation, handleValidationErrors, addOrder);
router.get('/:id', authorizeMiddleware('read', 'order'), getOrderValidation, handleValidationErrors, getOrderById);
router.put('/:id',authorizeMiddleware('edit', 'order'),updateOrderValidation, handleValidationErrors, updateOrder);
router.delete('/:id', authorizeMiddleware('delete','order'),deleteOrderValidation, handleValidationErrors, deleteOrder);

export default router;