import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";
import { uploadImageCloudinary } from "../utils/ImageUploader.js";
import { respond } from "../utils/response.js";
import { Vendor } from "../models/Vendor.js";
import dotenv from "dotenv"

dotenv.config();

export const updateVendorDetails = async (req,res) => {
    try{
        const {gstNumber = "", gstInvoice = "", shopName = ""} = req.body

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
        const vendor = await Vendor.findById(userDetails.vendorDetails);

        const gstInvoiceImage = req.files.gstInvoice;

        const invoice = await uploadImageCloudinary(gstInvoiceImage,process.env.FOLDER_NAME)

        vendor.gstNumber = gstNumber;
        vendor.gstInvoice = invoice.secure_url;
        vendor.shopName = shopName;
        await vendor.save();

        const updatedVendorDetails = await User.findById(userId).populate("vendorDetails").exec();

        return respond(res,"vendorDetails updated successfully",200,true,updatedVendorDetails)
    } catch(error) {
        console.log(error)
        return respond(res,"something went wrong while updating the vendorDetails",500,false)
    }
} 

export const updateProfile = async (req,res) => {
    try{
        const {name,contactNumber = "",dateOfBirth = "",gender = ""} = req.body

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
        const profileDetails = await Profile.findById(userDetails.profile);

        const user = await User.findByIdAndUpdate(userId,{
            name:name
        })
        await user.save()

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userId).populate("profile").exec();

        return respond(res,"profile updated successfully",200,true,updatedUserDetails)
    } catch(error) {
        console.log(error)
        return respond(res,"something went wroong while updating the profile",500,false)
    }
}