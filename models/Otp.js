import mongoose from "mongoose";
import {mailsender} from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60*10,
    },
})

async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailsender(email,"Verification Email fromm StudyNotion",otp);
        console.log("Email sent Successfully:",mailResponse)
    } catch(error) {
        console.log("error occured while sending mails:", error);
        throw error;
    }
}

otpSchema.pre("save" , async function (next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

export const Otp = mongoose.model("Otp",otpSchema);