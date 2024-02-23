import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import { checkAuth } from "../utils/authMiddleware.js";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe/create-checkout-session', checkAuth, async (req, res) => {

    const cartItem = req.body.cartItems.map((cart) => {
        return { cartId: cart._id };
    });
    // console.log("Length",(JSON.stringify(cartItem)).length);
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.user._id.toString(),
            cart: JSON.stringify(cartItem)
        }
    });

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product.name,
                    images: [item.product.images.url],
                    description: item.product.description,
                    metadata: {
                        id: item.product.id,
                    },
                },
                unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'usd',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    },
                },
            },
        ],
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: "http://localhost:5173/success-checkout",
        cancel_url: "http://localhost:5173/cart",
    });
    res.send({ url: session.url });
});

let endpointSecret;
// const endpointSecret = process.env.ENDPOINTSECRET;

const createOrder = async (customer, data) => {
    let carts = JSON.parse(customer.metadata.cart);
    const id=carts.map((cart)=> cart.cartId);
    const cart=await Cart.find({ "_id": {$in:id}}).populate("product").populate("user").populate("product.images").populate("product.reviews");
    const newItems=cart.map(cart=>{
        return {product:cart.product,quantity:cart.quantity};
    })
    console.log(newItems);
    let { address, email, name } = data.customer_details;
    let newOrder = new Order({
        user: customer.metadata.userId,
        items: newItems,
        shippingInfo: {
            name: name,
            address: {
                city: address.city,
                country: address.country,
                state: address.state,
                postal_code: address.postal_code
            },
            email: email,
        },
        paymentIntentId: data.payment_intent,
        payment_status: data.payment_status,
        totalCost: data.amount_total
    });
    await newOrder.save();
    deleteFromCart(carts);
}

const deleteFromCart=async(carts)=>{
    for(let cart of carts){
        await Cart.findByIdAndDelete(cart.cartId);
    }
}

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let eventType;
    let data;
    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("Webhook verified...");
        } catch (err) {
            console.log("Webhook not verified...", err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    }
    else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer)
            .then((customer) => {
                createOrder(customer, data);
            })
            .catch((err) => {
                console.log(err.message);
            })

    }
    res.send();
});

export default router;