import mongoose from "mongoose"

const categorySchema = new mongoose.Schema ({
    categoryName: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    Brand: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    }]
})

export const Category = mongoose.model("Category", categorySchema);