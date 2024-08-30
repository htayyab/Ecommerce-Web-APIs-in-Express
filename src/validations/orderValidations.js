import {body, param} from 'express-validator';

export const addOrderValidation = [
  body('user')
      .isMongoId()
      .withMessage('Invalid user ID format')
      .notEmpty()
      .withMessage('User ID is required'),

  body('items')
      .isArray({ min: 1 })
      .withMessage('Items array must contain at least one item')
      .custom((items) => {
        for (let item of items) {
          if (!item.product) {
            throw new Error('Each item must contain a product ID');
        }
        if (!item.quantity || item.quantity < 1) {
          throw new Error('Each item must contain a quantity of at least 1');
        }
      }
      return true;
    }),

  body('paymentMethod')
      .isIn(['Credit Card', 'PayPal', 'Cash on Delivery'])
      .withMessage('Invalid payment method')
      .notEmpty()
      .withMessage('Payment method is required'),

  body('shippingAddress')
      .isString()
      .withMessage('Shipping address must be a string')
      .notEmpty()
      .withMessage('Shipping address is required'),

  body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage('Invalid status'),

  body('totalPrice')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Total price must be a positive integer')
      .toInt()

];


export const getOrderValidation = [
  param('id')
      .isMongoId()
      .withMessage('Invalid order ID'),
  ];


export const updateOrderValidation = [

  param('id')
        .isMongoId()
        .withMessage('Invalid order ID format')
        .notEmpty()
        .withMessage('Order ID is required'),

  body('user')
      .optional()
      .isMongoId()
      .withMessage('Invalid user ID format'),

  body('items')
      .optional()
      .isArray({ min: 1 })
      .withMessage('Items array must contain at least one item')
      .custom((items) => {
        for (let item of items) {
          if (!item.product) {
            throw new Error('Each item must contain a product ID');
          }
          if (!item.quantity || item.quantity < 1) {
              throw new Error('Each item must contain a quantity of at least 1');
            }
          }
          return true;
      }),

  body('paymentMethod')
      .optional()
      .isIn(['Credit Card', 'PayPal', 'Cash on Delivery'])
      .withMessage('Invalid payment method'),

  body('shippingAddress')
      .optional()
      .isString()
      .withMessage('Shipping address must be a string'),

  body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage('Invalid status'),

  body('totalPrice')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Total price must be a positive integer')
      .toInt()
  ];


export const deleteOrderValidation = [
  param('id')
      .isMongoId()
      .withMessage('Invalid order ID'),
  ];
