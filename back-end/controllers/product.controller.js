const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../models/product.model");


// Get all products
const getProducts = asyncHandler(async (req, res) => {
    const { categoryId } = req.query;
    const matchStage = {}

    if (categoryId) {
        matchStage.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    const aggregationPipeline = [
        { $match: matchStage },
        { $sort: { createdAt: -1 } }
    ];
    const products = await Product.aggregate(aggregationPipeline);

    res.status(200).json({ 
        status: 'success',
        data: products,
        message: 'products retrieved successfully'
    });
})

// create new product
const createProduct = asyncHandler(async (req, res) => {
    console.log("the request body is: ", req.body);
    const {name, description, price, categoryId } = req.body;
    if (!name || !description || !price || !categoryId) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const product = await Product.create({
        name,
        description,
        price,
        categoryId
    })

    res.status(201).json({ 
        status: 'success',
        data: product,
        message: 'product create successfully' 
    });
});


// get product By ID
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Product not found",
        });
    }

    res.status(200).json({ 
        status: 'success',
        data: product, 
        message: 'product fetched successfully' 
    });
});


// update product
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Product not found",
        });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json({ 
        status: 'success', 
        data: updatedProduct, 
        message: 'product Edited successfully' 
    });
});


// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Product not found",
        });
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
        status: 'success',
        data: deletedProduct,
        message: 'product Deleted successfully',
    });
});



module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};