import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
import Product from '../models/products.js';

const checkAuth=async(req,res,next)=>{
    let token;
    token=req.cookies.token;
    if(!token){
        return res.status(400).send("no token available");
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.user_id).select("-password");
        next();
    }
    catch(err){
        console.log("Token expired");
        res.clearCookie("token");
        return res.status(400).send("Token expired");
    }
}

const checkOwner=async(req,res,next)=>{
    const { id } = req.params;
    const product=await Product.findById(id).populate("owner");
    if(req.user.email!=product.owner.email)
        return res.status(403).json("Not Authorized for deleting product");
    next();
}

const checkAdmin=(req,res,next)=>{
    if(req.user.role!='admin')
        return res.status(403).json("Not Authorized for creating a product");
    next();
}

export {checkAuth,checkOwner,checkAdmin};