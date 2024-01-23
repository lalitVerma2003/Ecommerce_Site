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
        address: { type: String },
        code: { type: String },
        city: { type: String },
        email: { type: String },
    },
    paymentDetails: {
        paymentMethod: { type: String }
    },
    totalCost: {
        type: Number
    }
})

const Order = mongoose.model("Order", orderSchema);

export default Order;