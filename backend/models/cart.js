import mongoose, { mongo } from 'mongoose';

const cartSchema=new mongoose.Schema({
    quantity:{
        type: Number
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Cart=mongoose.model('Cart',cartSchema);

export default Cart;