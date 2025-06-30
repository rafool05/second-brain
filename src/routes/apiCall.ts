import express from "express"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {uModel,tModel,linkModel, contModel} from "../models/db"
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = String(process.env.JWT_SECRET);
import {z} from 'zod'
import { auth } from "../middleware/auth.middleware"
import {userType, passwordType} from '../types/types'
import cookieParser from 'cookie-parser';
const router = express.Router();
router.use(cookieParser())
router.use(express.json())
// mongoose.connect(DB_url)
router.post("/signup",async(req,res)=>{
    const username : userType = req.body.username;
    const password : passwordType = req.body.password;
    //verify this 
    
    bcrypt.hash(password,5,async (err,hash)=>{
        try{
            await uModel.create({
                username,
                password : hash
            })
            res.status(200).json({
                message : "Successfully created user"
            })
        }
        catch{
            res.status(403).json({
                message : "User already exists"
            })
        }
    })
    
})
router.post("/signin",async(req,res)=>{
    const username : userType = req.body.username;
    const password : passwordType = req.body.password;
    const user = await uModel.findOne({username})
    if(user != undefined){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({
                    userId : user._id
                },JWT_SECRET)
                res.cookie("token",token,{
                    httpOnly: true,
                    secure: true,         
                    sameSite: "strict",   
                    maxAge: 3600000
                })
                res.status(200).json({
                    // token,
                    message : "Signed in Successfully"
                })
            }
            else{
                res.status(403).json({
                    message : "Invalid password"
                })
            }
        })
    }
    else{
        res.status(403).json({
            message : "User does not exist"
        })
    }

})
router.post("/content",auth,async (req,res)=>{
    let {type, content, title,tags,userId} = req.body;
    let tagIds : Types.ObjectId[] = [];
    for (let t in tags){
        const tag = await tModel.findOneAndUpdate(
            {title : tags[t]},
            {title : tags[t]},
            {new : true, upsert : true}
        )
        tagIds.push(tag._id)
    }
    try{

        await contModel.create({
            type,content,title,tags : tagIds,userId,date : new Date()
        })
        res.json({
            message : "Created Successfully"
        })
    }
    catch(e){
        // console.log("Error found")
        res.json({
            message : "Error : " + e
        })
    }
})
router.get("/content",auth,async(req,res)=>{
    const content = await contModel.find({
        userId : req.body.userId
    }).populate("userId", "username").populate("tags","title")
    res.send(content)

})
router.post("/brain/share",auth,async(req,res)=>{
    const userId = req.body.userId;
    const status = req.body.status
    // console.log(status)
    const linkDoc = await linkModel.findOneAndUpdate(
        { userId },
        {
            $setOnInsert: {
                hash: randomizer(25),
            },
            $set:{
                status
            }
        },
        {
            new: true,
            upsert: true
        }
    );

    res.status(200).json({
        message : "Link Shared Successfully",
        status : linkDoc.status,
        hash : linkDoc.hash,

    })
})
router.get("/brain/share/:shareLink", async(req,res)=>{
    const hash = req.params.shareLink;
    // console.log(hash)
    const link = await linkModel.findOne({
        hash 
    })
    if(!link || link.status === false){
        res.status(411).json({
            message : "Invalid Link"
        })
        return;
    }
    const userId = link.userId;
    if(!userId){
        res.status(411).json({
            message : "This message should not be received"
        })
        return;
    }
    const content = await contModel.find({
        userId
    }).populate("tags","title")
    res.status(200).json({
        content 
    })

})
router.delete("/content",auth,async(req,res)=>{
    try{

        await contModel.deleteOne({
            _id : req.body._id
        })
        res.status(200).send({
            message : "Successfully deleted"
        })
    }
    catch{
        res.status(500).send({
            message : "Issue Detected"
        })
    }
    
})
function randomizer(len : number) : string {
    let ans : string = "";
    let letters : string = "qwertyuiopasdfghjlzxcvbnm1234567890"
    for(let i = 0; i < len; i++){
        ans += (letters[Math.floor(Math.random() * letters.length)])
    }
    return ans
}
export {router}