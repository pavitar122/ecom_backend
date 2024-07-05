import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import User from "../models/userModel.js"
import { hashPassword } from "../../config/hashing.js";




const createAdmin = async ()=>{
    const admin = await User.findOne({ name: "admin" })
    if (!admin) {
        
        await User.create({
            name: "admin",
            email: "admin@gmail.com",
            password: await hashPassword("123")
        })
        console.log("Admin has been created.")
    }else{
        console.log("Admin is already there.")
    }
}


try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("You are connected to MongoDB.")
    createAdmin();
} catch (error) {
    console.log(error)
}





