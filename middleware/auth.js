import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { respond } from "../utils/response.js";

dotenv.config()

export const auth = async(req,res,next) => {
    try{
        const token = req.cookies.token || req.body.token || req.header("authorization").replace("Bearer ","");

        if(!token) {
            return respond(res,"token is missing",400,false)
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        } catch(error) {
            console.log(error)
            return respond(res,"token is invalid",400,false)
        }
        next();
    } catch(error) {
        console.log(error)
        return respond(res,"error found while generate the token",500,false)
    }
}

export const isIndividual = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Individual"){
            return respond(res,"This protected route for individual users only",400,false)
        }
        next();
    } catch(error) {
        console.log(error);
        return respond(res,"user role not verify",500,false)
    }
}

export const isVendor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Vendor") {
            return respond(res,"This protected route for Vendor users only",400,false)
        }
        next();
    } catch(error) {
        console.log(error) 
        return respond(res,"user role not verify",500,false)
    }
}

export const isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin") {
            return respond(res,"This protected route for Admin users only",400,false)
        }
        next();
    } catch(error) {
        console.log(error) 
        return respond(res,"user role not verify",500,false)
    }
}

