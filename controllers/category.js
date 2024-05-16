import { Category } from "../models/Category.js";
import { respond } from "../utils/response.js";

export const createCategory = async(req,res) => {
    try{
        const {categoryName} = req.body;

        if(!categoryName){
            return respond(res,"category name is not mentioned",404,false);
        }

        const existing = await Category.findOne({categoryName:categoryName}) 

        if(existing) {
            return respond(res,"Category is already present",400,false)
        }

        const category = Category.create({categoryName});

        return respond(res,"Categories added successfully",200,true);

    } catch(error){
        console.log("Error in creating category : ",error);
        return respond(res,"Error while creating category",500,false);
    }
}

export const deleteCategory = async(req,res) => {
    try{
        const {categoryId} = req.body;

        await Category.findByIdAndDelete({_id: categoryId});

        return respond(res,"delete category ",200,true);
    } catch(error){
        console.log("Error in deleting category : ",error);
        return respond(res,"Error while deleting category",500,false);
    }
}

export const getAllCategory = async(req,res) => {
    try{
        const allCategory = await Category.find({});

        return respond(res,"All category fetched successfully",200,true,allCategory)
    } catch(error) {
        console.log(error);
        return respond(res,"All category not found",500,false)
    }
}