import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDatabase')
    .then(() => {
        console.log("Mongo Connection formed");
    })
    .catch(err => {
        console.log("Error Occured");
        console.log(err);
    })
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';

import userRoutes from './routes/user.js';
import productsRoutes from './routes/product.js';
import reviewRoutes from './routes/review.js';
import cartRoutes from './routes/cart.js';
import checkRoutes from './routes/checkout.js';
import orderRoutes from './routes/order.js';
import User from './models/user.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            console.log("Profile",profile);
            let user = await User.findOne({email:profile.emails[0].value});
            console.log("User in passport",user);

            if(!user){
                user = new User({
                    // googleId:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    role: "user"
                });

                await user.save();
                console.log("User logged in by google");
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get("/auth/google/callback",passport.authenticate('google',{ session:false, successRedirect:"http://localhost:5173/",failureRedirect: "http://localhost:5173/login"}),(req,res)=>{
    console.log("LoggedIn User",req.user);
    const token=generateToken(req.user._id);
        res.status(200).cookie("token", token).json({
            name:req.user.name,
            email:req.user.email,
            role:req.user.role,
        });
})

app.use('/', userRoutes);
app.use('/products', productsRoutes);
app.use('/products/:id/reviews', reviewRoutes);
app.use('/cart', cartRoutes);
app.use('/',checkRoutes);
app.use('/',orderRoutes);

app.listen(3000, () => {
    console.log("Request Listen");
})