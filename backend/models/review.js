import mongoose from 'mongoose';

const reviewSchema=new mongoose.Schema({
    body:String,
    rating:Number,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review=mongoose.model('Review',reviewSchema);

export default Review;