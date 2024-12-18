
const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model")


// Get all categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.aggregate([{ $match: { isDeleted: false }}]);
    res.status(200).json({ 
        status: 'success', 
        data: categories.reverse(), 
        message: 'Categories retrieved successfully'
     });
});

// create new category
const createCategory = asyncHandler(async (req, res) => {
    console.log("the request body is: ", req.body);
    const {name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const category = await Category.create({
        name,
        description
    });

    res.status(201).json({ 
        status: 'success', 
        data: category, 
        message: 'Category Create successfully' 
    });
});


// get category By ID
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).json({ 
            status: 'error', 
            message: "Category not found" 
        });
    }

    res.status(200).json({ 
        status: 'success', 
        data: category, 
        message: 'Category fetched successfully' 
    });
});


// update category
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).json({ 
            status: 'error', 
            message: "Category not found" 
        });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        // ...req.body,
        {new: true}
    )

    res.status(200).json({ 
        status: 'success', 
        data: updatedCategory, 
        message: 'Category Edited successfully' 
    });
});


// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(404).json({ 
            status: 'error', 
            message: "Category not found" 
        });
    }
    const deleteCategory = await Category.findByIdAndUpdate(
        req.params.id, 
        { $set: { isDeleted: true }}, 
        { new: true }
    );

    res.status(200).json({ 
        status: 'success', 
        data: deleteCategory, 
        message: 'Category Deleted successfully' 
    });
});


module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};