import { body, param } from "express-validator";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

export const addProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description can be up to 200 characters long"),

  body("price")
    .exists()
    .withMessage("Price is required.")
    .notEmpty()
    .withMessage("Price cannot be empty.")
    .isInt({ min: 1 })
    .withMessage("Must be a non-negative integer"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID")
    .custom(async (value) => {
      categoryExists = await Category.findById(value);
      if (!categoryExists) {
        throw new Error("User Id does not exist");
      }
      return true;
    }),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID")
    .custom(async (value) => {
      userExists = await User.findById(value);
      if (!userExists) {
        throw new Error("User Id does not exist");
      }
      return true;
    }),
];

export const getProductValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),
];

export const deleteProductValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),
];

export const updateProductValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description can be up to 200 characters long"),

  body("price")
    .optional()
    .isDecimal()
    .withMessage("Price must be a decimal number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID")
    .custom(async (value) => {
      categoryExists = await Category.findById(value);
      if (!categoryExists) {
        throw new Error("User Id does not exist");
      }
      return true;
    }),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID")
    .custom(async (value) => {
      userExists = await User.findById(value);
      if (!userExists) {
        throw new Error("User Id does not exist");
      }
      return true;
    }),
];
