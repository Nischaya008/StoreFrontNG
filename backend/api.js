import product from "./model.js";
import mongoose from "mongoose";

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
};

export const Getallproduct = async (req, res) => {
    try{
        const products=await product.find();
        res.status(200).json({message:"Product fetched successfully",product:products});
    }catch(error){
        res.status(500).json({message:"Failed to fetch products"});
    }
};
export const Createproduct = async (req, res) => {
    const productData = req.body;
    console.log("Received product data:", productData);
    
    if(!productData.name || !productData.price || !productData.image){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Please provide all the required fields",
            product: productData
        });
    }

    if (productData.shopping) {
        productData.shopping = productData.shopping;
    }

    const newProduct = new product(productData);
    try {
        const savedProduct = await newProduct.save();
        res.status(HTTP_STATUS.CREATED).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch(error) {
        console.error("Server error:", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json({
            message: "Failed to create product"
        });
    }
};
export const Updateproduct = async (req, res) => {
    const {id} = req.params;
    const productData = req.body;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Invalid id"});
    }

    if (productData.shopping) {
        productData.shopping = productData.shopping;
    }

    try{
        const updateproduct = await product.findByIdAndUpdate(id,productData, {new:true});
        res.status(201).json({message:"Product updated successfully",product:updateproduct});
    }catch(error){
        res.status(500).json({message:"Failed to update product"});
    }
};
export const Deleteproduct = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Invalid id"});
    }
    try{
        await product.findByIdAndDelete(id);
        res.status(201).json({message:"Product deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete product"});
    }
};
