import mongoose from "mongoose";

const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        required: true,
        type: String,
      },
      accountType: {
        required: true,
        type: String,
        enum: ["Individual", "Vendor","Admin"],
      },
      address: {
        required: true,
        type: String,
      },
      city:{
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: Number,
      },
      image: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      resetpasswordexpires: {
        type: Date,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        }
      ],
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
      vendorDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    //   Location: {
    //     type: String,
    //   },
      token: {
        type: String
      }
});

export const User = mongoose.model("User", schema);