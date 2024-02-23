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
import userRoutes from './routes/user.js';
import productsRoutes from './routes/product.js';
import reviewRoutes from './routes/review.js';
import cartRoutes from './routes/cart.js';
import checkRoutes from './routes/checkout.js';
import orderRoutes from './routes/order.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/products', productsRoutes);
app.use('/products/:id/reviews', reviewRoutes);
app.use('/cart', cartRoutes);
app.use('/',checkRoutes);
app.use('/',orderRoutes);

app.listen(3000, () => {
    console.log("Request Listen");
})