import express from "express";
import { Getallproduct, Createproduct, Updateproduct, Deleteproduct } from "./api.js";
const router = express.Router();
//Get all Products
router.get("/", Getallproduct);
//Create a new product
router.post("/", Createproduct);
//Update a product
router.put("/:id", Updateproduct);
//Delete a product
router.delete("/:id", Deleteproduct);

export default router;