import express from 'express';
const router=express.Router();
import User from '../models/user.js';
import {createUser,login,logout} from '../controller/user.js';
import { checkAuth } from '../utils/authMiddleware.js';

router.post('/register',createUser)

// router.post('/login',storeReturnTo,passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),login)
router.post('/login',login);

router.get('/logout',checkAuth,logout); 

// router.get('/login/forgetpassword',(req,res)=>{
//     res.render('user/updatePassword');
// })

// router.put('/login/forgetpassword',async(req,res)=>{
//     const {username,password}=req.body;
//     const user=await User.find({username:username});
//     // console.log(user);
//     const oldpassword=user.password;
//     user.changePassword(oldpassword,password,function(err){
//         console.log(err);
//     });
//     // await user.setPassword(password);
//     // const updatedUser=await user.save();
//     console.log(updatedUser);
//     req.flash('success','Password Updated Successfully');
//     // res.redirect('/login');
//     res.send("Password Updated");
// })

// router.get('/profile',isLoggedIn,async(req,res)=>{
//     const userId=req.user._id;
//     const user=await User.findById(userId);
//     res.render('user/profile',{user});
//     // res.send("Your Profile");
// })

export default router;