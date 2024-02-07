import Product from '../models/products.js';
import Review from '../models/review.js';

export async function createReview(req,res){
    const {id}=req.params;
    const product=await Product.findById(id);
    const review=new Review(req.body);
    review.owner=req.user;
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.status(200).json(review);
}

export async function deleteReview(req,res){
    const {id,reviewId}=req.params;
    const product=await Product.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    const deletedReview=await Review.findByIdAndDelete(reviewId,{new :true});
    // console.log(product,deletedReview);
    res.status(200).json(product);
}