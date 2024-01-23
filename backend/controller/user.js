import User  from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';


export async function createUser(req,res){
    
    const{username,password,email,role}=req.body;
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
    // console.log(newUser);
    if(newUser){
        const token=generateToken(newUser._id);
        // console.log("Logged in token ",token);
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
    const {email,password}=req.body;
    const user=await User.findOne({email:email});

    if(user&&(await user.matchPassword(password))){
        const token=generateToken(user._id);
        // console.log("Logged in token ",token);
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