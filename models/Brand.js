import mongoose from "mongoose"

const BrandSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
})

export const Brand = mongoose.model("Brand", BrandSchema);