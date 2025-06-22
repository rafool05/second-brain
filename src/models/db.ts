import  { Types, Schema, Model, model } from 'mongoose'


const userSchema = new Schema({
    username : {required : true, type : String, unique : true},
    password : {required : true, type : String}
})
export const uModel = model( "User",userSchema);

const tagSchema = new Schema({
    title : {required : true, type : String},

})
export const tModel = model( "Tags",tagSchema );

const contentSchema = new Schema({
    content : {type : String, required: true},
    type : {type : String, required : true},
    title : {type : String, required : true},
    tags : [{type : Types.ObjectId, ref : "Tags"}], 
    userId : {type : Types.ObjectId, ref : "User", required : true},
    date : {type : Date}
})
export const contModel = model( "Content",contentSchema)

const linkSchema = new Schema({
    hash : {type : String, required : true},
    userId : {type : Types.ObjectId, ref : "User", required : true}
})
export const linkModel = model("Links",linkSchema)       