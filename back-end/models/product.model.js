const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the product's name"],
    },
    description: {
        type: String,
        required: [true, "please add the product's description"],
    },
    price: {
        type: Number,
        required: [true, "please add the product price"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
},
    {
        timestamps: true,
    }

);
module.exports = mongoose.model("Products", productSchema);