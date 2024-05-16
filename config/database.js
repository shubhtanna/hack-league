import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_DB_URL, { 
        dbName: "e-waste", 
    })
    .then(() => console.log("DB connected"))
    .catch((error) => {
        console.log("Error in coonect database");
        console.log(error);
    })
}
