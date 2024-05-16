import express from "express"
import { createCategory, deleteCategory, getAllCategory } from "../controllers/category.js";
import {auth,isAdmin} from "../middleware/auth.js"
import { createBrand, deleteBrand, getAllBrand } from "../controllers/Brand.js";

const router = express.Router();

router.post("/createcategory",auth,isAdmin,createCategory)
router.delete("/deletecategory",auth,isAdmin,deleteCategory)
router.get("/getallcategory",getAllCategory)

router.post("/createbrand",auth,isAdmin,createBrand);
router.delete("/deletebrand",auth,isAdmin,deleteBrand);
router.get("/getallbrand",getAllBrand)

export default router;