import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const addProduct = async (req, res) => {
    const {name, price, discription, quantity, categoryId} = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({
                message: 'Category not found'
            });
        }
        
        const product = await Product({ name, price, discription, quantity, category: categoryId});
        await product.save();

        res.status(201).json({
            message: 'Product added successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Fetch products with pagination
export const getProducts = async (req, res) => {
    const {categoryId} = req.params;
    const { page = 1, limit = 10 } = req.query; // Default page=1 and limit=10

    try {
        const products = await Product.find({ category: categoryId})
            .populate('category', 'name')
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

            const totalProduct = await Product.countDocuments({ category: categoryId});

            res.status(200).json({
                total: totalProduct,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalProduct / limit),
                products,
            });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}