import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import { checkOut } from "../controller/checkout.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe/create-checkout-session', async (req, res) => {
    // console.log(req.body);

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
        mode: 'payment',
        success_url: "http://localhost:5173/success-checkout",
        cancel_url: "http://localhost:5173/cart",
    });
    res.send({ url: session.url });
});

export default router;