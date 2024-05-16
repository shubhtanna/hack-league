import { respond } from "../utils/response.js";
import { Brand } from "../models/Brand.js";
import { Category } from "../models/Category.js";

export const createBrand = async(req,res) => {
    try{
        const {name,categoryId} = req.body;

        if(!name || !categoryId){
            return respond(res,"Brand Name is missing ",404,false);
        }

        const existing = await Brand.findOne({name:name})

        if(existing) {
            return respond(res,"Brand is already present",400,false)
        }
        
        const brand = await Brand.create({name,categoryId});

        await Category.findByIdAndUpdate({
            _id:categoryId
        },
        {
            $push:{
                Brand: brand._id
            }
        }, {new:true}
    );

    return respond(res,"Brands added successfully",200,true,brand);

    } catch(error){
        console.log("Error in create brand : ",error);
        return respond(res,"Error while creating brand",500,false);
    }
}

export const deleteBrand = async(req,res) => {
    try{
        const {brandId,categoryId} = req.body;

        await Brand.findByIdAndDelete(brandId);

        await Category.findByIdAndUpdate({
            _id:categoryId
        },
        {
            $pull:{
                Brand: brandId
            }
        }, {new:true}
    )

        return respond(res,"Delete brand successfully",200,true);
    } catch(error){
        console.log("Error in delete Brand : ",error);
        return respond(res,"Error while deleting brand",500,false);
}
}

export const getAllBrand = async(req,res)=> {
    try{
        const allBrand = await Brand.find({});

        return respond(res,"All Brand fetched successfully",200,true,allBrand)
    } catch(error) {
        console.log(error);
        return respond(res,"All brands not found",500,false)
    }
}
