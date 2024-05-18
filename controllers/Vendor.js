import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { respond } from "../utils/response.js";

export const getAllProductsByCity = async (req,res) => {
    try{
        const location = req.user.city;
        const data = await Product.find({city:location})

        return respond(res,"get all products by city successfully",200,true,data)
    } catch(error) {
        console.log(error) 
        return respond(res,"Error in fetching the products by city",500,false)
    }
}