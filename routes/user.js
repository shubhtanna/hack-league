import express from "express"
import { login, sendOtp, signup } from "../controllers/auth.js"
import { contactUs } from "../controllers/Contact.js";
import { auth } from "../middleware/auth.js";
import { updateProfile } from "../controllers/UpdateProfile.js";

const router = express.Router()

router.post("/sendotp",sendOtp);
router.post("/signup",signup)
router.post("/login", login)
router.post("/contactus",contactUs)
router.post("/updateprofile",auth,updateProfile)

export default router;