import express from "express"
import { auth, isVendor } from "../middleware/auth.js";
import { updateVendorDetails } from "../controllers/UpdateProfile.js";

const router = express.Router();

router.post("/updatevendordetails",auth,isVendor,updateVendorDetails)

export default router;