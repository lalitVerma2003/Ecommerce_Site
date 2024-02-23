import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingInfo: {
        name: { type: String },
        address: { 
            city:{type:String},
            country:{type:String},
            state:{type:String},
            postal_code:{type:String}
         },
        email: { type: String },
    },
    paymentIntentId:{
        type: String,
    },
    payment_status:{
        type:String
    },
    delivery_status:{
        type:String,
        default: "pending"
    },
    totalCost: {
        type: Number
    }
},
{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;