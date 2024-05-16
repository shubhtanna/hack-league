import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
    },
    contactNumber: {
        type: Number,
        trim: true,
    }
});

export const Profile = mongoose.model("Profile",profileSchema)