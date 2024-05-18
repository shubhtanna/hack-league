import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brandName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    modelName: {
        type: String,
    },
    individual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage : [
        {
            required: true,
            type: String,
        }
    ],
    invoiceImage: {
        type: String,
    },
    interestedShopkeeper: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    estimatedprice: [
        {
            type: Number,
        }
    ],
})

export const Product = mongoose.model("Product", productSchema)