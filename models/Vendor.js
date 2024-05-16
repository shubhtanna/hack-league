import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    profile: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    gstNumber: {
        type: String,
    },
    gstInvoice: {
        type: String,
    },
    shopName: {
        type: String,
    },
    
})

export const Vendor = mongoose.model("Vendor",vendorSchema)