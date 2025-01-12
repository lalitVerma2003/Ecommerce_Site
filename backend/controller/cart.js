import User from '../models/user.js';
import Product from '../models/products.js';
import Cart from '../models/cart.js';


export async function addCart(req, res) {
    const { id } = req.params;
    const inc = +req.body.quantity;
    const product = await Product.findById(id);
    const user = await User.findById(req.user.id);
    let cart = await Cart.find({
        $and: [
            { user: { $eq: user } },
            { product: { $eq: product } }
        ]
    });
    let prevCart = cart[0];
    if (cart[0]) {
        const updatedCart = await Cart.findByIdAndUpdate(prevCart._id,{ $inc: { quantity:inc } }, { new: true });
        return res.status(200).json(updatedCart);
    }
    const newCart = new Cart({ quantity: 1, product, user });
    await newCart.save();
    res.status(200).json(newCart);
}

export async function deleteCart(req, res) {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    res.json(cart);
}

export async function addQuantity(req, res) {
    const { query } = req.query;
    let cart = await Cart.findById(req.params.id);
    if (query == "inc") {
        cart = await Cart.findOneAndUpdate(cart, { $inc: { quantity: 1 } }, { new: true }).populate("product");
    } else if (cart.quantity == 1) {
        await Cart.deleteOne(cart);
    } else {
        cart = await Cart.findByIdAndUpdate(req.params.id, { $inc: { quantity: -1 } }, { new: true }).populate("product");
    }
    return res.status(200).json(cart);
}

export async function showCart(req, res) {
    const id = req.user._id;
    const cartItem = await Cart.find({ user: id }).select("quantity").populate({
        path: "product",
        select: "name price description images"
    });
    console.log(cartItem);
    res.json(cartItem);
}