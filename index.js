import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/database.js";
import { respond } from "./utils/response.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import vendorRouter from "./routes/vendor.js"
import individualRouter from "./routes/individual.js"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true,
//     })
// )

cloudinaryConnect();

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/product",productRouter)
app.use("/api/v1/vendor",vendorRouter)
app.use("/api/v1/individual",individualRouter)

app.get("/" , (req,res) => {
    return respond(res,"Your Server is up and running",200,true)
});

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`)
});