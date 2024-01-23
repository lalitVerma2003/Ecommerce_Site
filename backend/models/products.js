import mongoose from 'mongoose';
import Review from './review.js';

const productSchema = new mongoose.Schema({
    name: {
        type: String
        // required: [true,'Product name is required']
    },
    description: {
        type: String,
        // required: [true,'Product Description is required']
    },
    price: {
        type: Number
        // required: [true,'Price is required'],
        // min:[1]
    },
    images: [
        {
            url: String,
            filename: String
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    brand: { type: String,
            //  required: true 
    },
    category: { 
        type: String, 
        // required: true
    },
});

productSchema.post('findOneAndDelete', async (prod) => {
    if (prod) {
        await Review.deleteMany({
            _id: { $in: prod.reviews }
        });
    }
})



const Product = mongoose.model('Product', productSchema);

export default Product;