import express from 'express';
const router=express.Router();
import {addCart,deleteCart, showCart, addQuantity} from '../controller/cart.js';
import { checkAuth } from '../utils/authMiddleware.js';

router.get('/show',checkAuth,showCart);

router.post('/addproduct/:id',checkAuth,addCart);

router.patch('/add/:id',checkAuth,addQuantity);

router.delete('/:id',checkAuth,deleteCart);

export default router;