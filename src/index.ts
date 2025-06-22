import express from "express";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import {router as apiCall} from "./routes/apiCall"
import dotenv from 'dotenv'
import cors from "cors"
import { auth } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";
dotenv.config()

const DB_url = String(process.env.DB_url)
const JWT_SECRET = process.env.JWT_SECRET       
const app = express();
app.use(express.json())
mongoose.connect(DB_url)
app.use(cors({
  origin: "http://localhost:5173",  // ✅ NOT "*"
  credentials: true,                // ✅ allow cookies
}));
app.use(cookieParser())
app.use("/api/v1",apiCall)
app.get("/auth/check",auth,(req,res)=>{
    res.status(200).json({
      message : "Verified"
    })
})
app.get("/logout",(req,res)=>{
  console.log("here")
    res.clearCookie("token",{
      httpOnly: true,
      secure : true,
      sameSite : 'strict'
    })
    res.json({
      message : "Logged Out Successfully"
    })
})  
app.listen(3000, ()=>{
    console.log("running on 3000")
})