import express from "express";
import Order from "../models/order.js";
import { checkAuth } from "../utils/authMiddleware.js";
const router=express.Router();

router.get("/orders",checkAuth,async(req,res)=>{
    const orders=await Order.find({user:req.user._id}).populate({
        path: "user",
        select :"-password"
    }).populate({
        path: "items.product",
        select: "name description price images"
    }).populate("items.product.reviews").sort({ _id: "asc" });
    console.log(orders);
    res.status(200).json(orders);
})

export default router;