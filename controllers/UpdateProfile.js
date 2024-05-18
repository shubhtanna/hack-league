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

export const updateDisplayPicture = async(req,res) => {
    try{
      const displayPicture = req.files.displayPicture
  
      const userId = req.user.id
  
      const image = await uploadImageCloudinary(displayPicture,process.env.FOLDER_NAME)
  
      const updateProfileImage = await User.findByIdAndUpdate({
        _id: userId
      },{image: image.secure_url},{new:true})
  
      return respond(res,"Image Update successfully",200,true)
    } catch(errro) {
      console.log(errro);
      return respond(res,"Something went wrong while updating the display image",500,false)
  }
  }

export const changePassword = async (req,res) => {
    try{
      const userDetails = await User.findById(req.user.id)
  
      const {oldPassword,newPassword} = req.body
  
      const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password)
  
      if (!isPasswordMatch) {
        return respond(res,"The password is incorrect",401,false)
    }
  
    const encryptedPassword = await bcrypt.hash(newPassword,10)
  
    const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,{password:encryptedPassword},{new:true})
  
    try{
      const emailResponse = await mailsender(updatedUserDetails.email,"Password for your account has been updated",passwordUpdate(
        updatedUserDetails.email,
        `Password updated successfully for ${updatedUserDetails.name}`
      ))
    } catch(error) {
      console.log(error)
      return respond(res,"Error occured while sending the email",500,false)
  }
  return respond(res,"Password Updated Successfully",200,true)
    }  catch(error) {
      console.log(error)
      return respond(res,"Something went wrong while changing the password",500,false)
  }
  }

  export const deleteAccount = async (req,res) => {
    try{
      const id = req.user.id
      
      const userDetails = await User.findById(id);
          if(!userDetails) {
              return respond(res,"User not found",400,false)
          }
  
      await Profile.findByIdAndDelete({_id:userDetails.profile})
  
      await User.findByIdAndDelete({_id: id})
  
      return respond(res,"Deteting account successfully",200,true)
    } catch(error) {
      console.log(error)
      return respond(res,"Something went wrong while deleteing the account",500,false)
  }
  }