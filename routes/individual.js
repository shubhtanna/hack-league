import express from "express";
import { getAllProductsOfUser, getShopByCity } from "../controllers/Individual.js";
import {auth,isAdmin, isIndividual} from "../middleware/auth.js"
import { createProduct, deleteProduct } from "../controllers/Product.js";

const router = express.Router();

router.get("/getshopbycity",auth,isIndividual,getShopByCity)
router.post("/createproduct",auth,isIndividual,createProduct)
router.get("/productslist",auth,isIndividual,getAllProductsOfUser)
router.delete("/deleteproduct",auth,isIndividual,deleteProduct)

export default router;