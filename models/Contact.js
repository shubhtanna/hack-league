import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {  
        email:{
            type:String,
            required:true,
            trim:true
        },
        message:[
            {
                type:String,
                required:true,
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now(),
        }
    }
)

export const Contact = mongoose.model("Contact",contactSchema);