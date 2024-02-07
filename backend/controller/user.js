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
    const user=await User.findOne({email});
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
        res.status(400).send("User not created");
    }
}

export async function login(req,res){

    // const {error,value}=userSchema.validate(req.body);
    // if(error){
    //     return res.json({ error: error.details[0].message });
    // }
    const{password,email}=req.body;
    const user=await User.findOne({email:email});

    if(user&&(await user.matchPassword(password))){
        const token=generateToken(user._id);
        res.cookie("token", token, { httpOnly: true }).json({
            name:user.name,
            email:user.email,
            role:user.role,
        });
    }
    else{
        res.status(400).send("User or password is wrong");
    }
}

export function logout(req, res){
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
}