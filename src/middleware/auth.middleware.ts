import { NextFunction, Request, Response} from 'express';
import express from 'express'
import jwt from 'jsonwebtoken'
import  dotenv from 'dotenv' 
type JwtPayload = jwt.JwtPayload;
const app = express();
app.use(express.json())
dotenv.config()
const JWT_SECRET = String(process.env.JWT_SECRET)
export function auth(req : Request,res : Response,next : NextFunction){
    const token : string  = req.cookies?.token as string
    // console.log("token : "+token)
    try{
        // console.log("body : " + req.body)
        req.body = req.body || {};
        req.body.userId = (jwt.verify(token , JWT_SECRET) as JwtPayload).userId
        next();
    }
    catch(error){
        // console.log("error : " + error)
        res.status(403).json({
            message : "Not Verified"
        })
    }
        
}