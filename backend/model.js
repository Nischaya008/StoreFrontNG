import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    shopping:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});
const product = mongoose.model("product",ProductSchema);
export default product;