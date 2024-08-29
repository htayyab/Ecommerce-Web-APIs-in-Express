import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const createProduct = new Product(req.body);
        await createProduct.save();

        res.status(201).json({
            status: 'success',
            message: 'Product added successfully',
            data: createProduct,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({_id: -1});
        if (products.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No Products found',
                data: [],
            });
        }
        res.status(200).json({
            status: 'success',
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: product, // This will include the categoryId as just an ID
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

export const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, image } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }

        // Update fields only if they are provided in the request body
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (categoryId) product.categoryId = categoryId;
        if (image) product.image = image;

        await product.save();

        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
