import Category from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
    const {name, discription} = req.body;

    try {
        // Check if category already exists
        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            return res.status(400).json({
                message: 'Category alreday exists'
            });
        }

        const category = new Category({name, discription});
        await category.save();

        res.status(200).json({
            message: 'Category added successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getAllCategories = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default page=1 and limit=10
    try {
        const categories = await Category.find()
            .skip((page - 1) * parseInt(limit)) // Skip records for pagination
            .limit(parseInt(limit)); // Limit the number of records returned

        const totalCategories = await Category.countDocuments(); // Total number of categories

        res.status(200).json({
            total: totalCategories,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCategories / limit),
            categories,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}