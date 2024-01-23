import express from 'express';
const router=express.Router({ mergeParams:true });  // mergeParams for fetching product id easily otherwise it gives error of not defining product
import Product from '../models/products.js';
import Review from '../models/review.js';
import {createReview,deleteReview} from '../controller/review.js';
import { checkAuth } from '../utils/authMiddleware.js';

router.post('/',checkAuth,createReview);
router.delete('/:reviewId',checkAuth,deleteReview);

export default router;