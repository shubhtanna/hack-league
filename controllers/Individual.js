import {User} from "../models/User.js"
import {respond} from "../utils/response.js"
import { Vendor } from "../models/Vendor.js"
import { uploadImageCloudinary } from "../utils/ImageUploader.js";
import { Product } from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

export const  getShopByCity = async(req,res) => {
    try{
        const {city,id} = req.user;
        
        const shop = await User.find({city:city,accountType:'Vendor'},{email:0,password:0,address:0,pincode:0,image:0,createdAt:0,products:0,profile:0,resetpasswordexpires:0,token:0})
        .populate({
                path: "vendorDetails",
                select: "-gstNumber -gstInvoice"
        }).exec();

        console.log(shop)

        return respond(res,"All the Shops fetched by city",200,true,shop);

    } catch(error){
        console.log("Error in fetching shop by city : ",error);
        return respond(res,"All the Shops are not fetched by city",500,false);
    }
}

export const getAllProductsOfUser = async(req,res) =>{
    try{
        const userId = req.user.id;
        
            const products = await User.findById({_id:userId}).populate("products").exec();

            if(!products) {
                return respond(res,"user not found or may be there are no produts found for that user",400,false)
            }

            return respond(res,"User all products found",200,true);
    } catch(error) {
        console.log(error)
        return respond(res,"something went wrong while found the user all products",500,false)
    }
}
