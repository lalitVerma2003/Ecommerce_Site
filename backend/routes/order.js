import express from "express";
import Order from "../models/order.js";
import { checkAuth } from "../utils/authMiddleware.js";
const router=express.Router();

router.get("/orders",checkAuth,async(req,res)=>{
    const orders=await Order.find({user:req.user._id}).populate("user").populate("items.product").populate("items.product.reviews");
    res.status(200).json(orders);
})

export default router;