const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the category's name"],
    },
    description: {
        type: String,
        required: [true, "please add the category's description"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }

);

module.exports = mongoose.model("Category", categorySchema);