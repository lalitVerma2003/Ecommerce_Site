import Order from "../models/order.js";
import Cart from "../models/cart.js";

const totalAmount=(cart)=>{
    return cart.reduce((total,item)=> total+item.product.price*item.quantity,0);
}

export async function checkOut(req,res){
    const {shippingInfo,paymentDetails,cartItems}=req.body;
    const user=req.user;
    if(!user || !shippingInfo || !paymentDetails || !cartItems)
        return res.status(400).json("Incomplete data for checkout");

    const totalCost=totalAmount(cartItems);

    const newOrder=new Order({
        user: user,
        shippingInfo,
        paymentDetails,
        totalCost
    })
    // await newOrder.save();

    const cartDeleted=await Cart.deleteMany({user:user},{new:true});

    console.log(cartDeleted);
    res.status(200).json(newOrder);
}