import User  from '../models/user.js';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import { generateToken } from '../utils/generateToken.js';

const userSchema=Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    role: Joi.string().min(2).valid('admin','user').required()
});

export async function createUser(req,res){
    
    const {error,value}=userSchema.validate(req.body);
    if(error){
        return res.json({ error: error.details[0].message });
    }

    const{username,password,email,role}=value;
    const user=await User.findOne({email}).select("-password");
    if(user){
        const token=generateToken(user._id);
        return res.cookie("token", token, { httpOnly: true }).json(user);
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new User({ 
        name:username,
        password: hashedPassword,
        email,
        role,
    });
    await newUser.save();
    if(newUser){
        const token=generateToken(newUser._id);
        res.cookie("token", token, { httpOnly: true }).json({
            username,
            email,
            role
        });
    }
    else{
        res.status(400).json("User not created");
    }
}

export async function login(req,res){

    // const {error,value}=userSchema.validate(req.body);
    // if(error){
    //     return res.json({ error: error.details[0].message });
    // }
    // console.log("Log in",req.body);
    const{password,email}=req.body;
    const user=await User.findOne({email:email});

    if(user&&(await user.matchPassword(password))){
        const token=generateToken(user._id);
        res.cookie("token", token).json({
            name:user.name,
            email:user.email,
            role:user.role,
        });
    }
    else{
        res.status(400).json("Invalid email or password");
    }
}

export function logout(req, res){
    res.clearCookie("token");
    console.log("Log out");
    res.status(200).json("Logged out successfully");
}

export async function forgotPassword(req,res){
    const { email,newPassword }=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.json("User not registered with this email");
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);
    user.password=hashedPassword;
    await user.save();

    return res.json(user);
}