// controllers/categoryController.js
import Category from '../models/category.model.js';

// get list of categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ _id: -1 });
        if (categories.length === 0) {
            return res.status(200).send({
                status: 'success',
                message: 'No categories found',
                data: [],
            });
        }
        res.status(200).send({
            status: 'success',
            data: categories,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};

// add category
export const addCategory = async (req, res) => {
    try {
        const existingCategory = await Category.findOne({ name: req.body.name });
        if (existingCategory) {
            return res.status(400).send({
                status: 'error',
                message: 'Category name already exists',
            });
        }
        const createCategory = new Category(req.body);
        await createCategory.save();
        res.status(201).send({
            status: 'success',
            message: 'Category added successfully',
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
}

// get specific category
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send({
                status: 'error',
                message: 'Category not found',
            });
        }
        res.status(200).send({
            status: 'success',
            data: category,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body; 
    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send({
                status: 'error',
                message: 'Category not found',
            });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).send({
                status: 'error',
                message: 'Category name already exists',
            });
        }

        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).send({
            status: 'success',
            message: 'Category updated successfully',
            data: category,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).send({
                status: 'error',
                message: 'Category not found',
            });
        }

        res.status(200).send({
            status: 'success',
            message: 'Category deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};
