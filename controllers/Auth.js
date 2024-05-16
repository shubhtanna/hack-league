import { User } from "../models/User.js";
import { Otp } from "../models/Otp.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { respond } from "../utils/response.js";
import { emailVerificationRes } from "../templates/emailVerificationRes.js";
import { mailsender } from "../utils/mailSender.js";
import { Profile } from "../models/Profile.js";
import { Vendor } from "../models/Vendor.js";

dotenv.config();

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email: email });

    // console.log(checkUserPresent)

    if (checkUserPresent) {
      return respond(res, "User already exist", 400, false);
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated: ", otp);

    let result = await Otp.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await otp.findOne({ otp: otp });
    }

    const otppayload = { email, otp };

    const otpBody = await Otp.create(otppayload);
    console.log(otpBody);

    const emailBody = emailVerificationRes(otp);
    mailsender(email, "Your otp", emailBody);

    return respond(res, "Otp send successfully", 200, true, otp);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return respond(
      res,
      "Something went wrong while sending the Otp",
      500,
      false
    );
  }
};

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      address,
      city,
      pincode,
      otp,
      accountType,
    } = req.body;

    if (
      !name ||
      !address ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !city ||
      !pincode ||
      !accountType
    ) {
      return respond(res, "All fields are required while signup", 400, false);
    }

    if (password !== confirmPassword) {
      return respond(res, "Passwords do not Match", 400, false);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return respond(res, "User is already exist", 400, false);
    }

    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    if (recentOtp.length === 0) {
      // OTP not found for the email
      return respond(res, "Otp not found", 400, false);
    } else if (otp !== recentOtp[0].otp) {
      // Invalid OTP
      return respond(res, "Invalid Otp", 400, false);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let vendorDetails;
    let profile;

    if (accountType === "Vendor") {
      vendorDetails = await Vendor.create({
        gstNumber: null,
        gstInvoice: null,
        shopName: null,
      });
    } 

      profile = await Profile.create({
        contactNumber: null,
        dateOfBirth: null,
        gender: null,
      });
    

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      accountType,
      address,
      city,
      pincode,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${name} ${accountType}`,
      profile: profile,
      vendorDetails: accountType === "Vendor" ? vendorDetails._id : undefined,
    });
    
    return respond(res, "User is registerd Successfully", 200, true);
  } catch (error) {
    console.log(error);
    return respond(res, "Something went wrong while singup", 500, false);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return respond(res, "All fields are required", 403, false);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return respond(
        res,
        "user is not registerd, Please signup first",
        404,
        false
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
        city: user.city,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "240h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 2 * 60 * 60 * 1000),
        httpOnly: true,
      }; //doubt

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return respond(res, "Password is incorrect", 401, false);
    }
  } catch (error) {
    console.log(error);
    return respond(res, "Login failure, Please try againn", 500, false);
  }
};
