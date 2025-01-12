import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    cartData:[],
    loading: false,
    error: null
};

const cartSlice=createSlice({
    name: "cart",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(fetchCartProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchCartProducts.fulfilled,(state,action)=>{
            state.cartData=action.payload;
            state.loading=false;
            console.log("Cart products");
        })
        .addCase(fetchCartProducts.rejected,(state)=>{
            state.loading=false;
            state.error="Error while fetching cart products";
        })
        .addCase(incrementCartProduct.fulfilled,(state,action)=>{
            console.log("Incremented ",action.payload);
            // const newCart=state.cartData.filter((cart)=>{
            //     if(cart._id===action.payload._id)
            //         return action.payload;
            //     else    
            //         return cart;
            // })
            // state.cartData=newCart;
        })
        .addCase(decrementCartProduct.fulfilled,(state,action)=>{
            console.log("Decremented ",action.payload);
        })
        .addCase(deleteCartProduct.fulfilled,(state,action)=>{
            console.log("Deleted",action.payload);
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            console.log("Added in cart",action.payload);
        })
    }
});

export const fetchCartProducts=createAsyncThunk(
    "cart/fetchCartProducts",
    async()=>{
        console.log("Cart products");
        const {data}=await axios.get("http://localhost:3000/cart/show");
        return data;
    }
)

export const addToCart=createAsyncThunk(
    "cart/addToCart",
    async(params)=>{
        const {productId,count}=params;
        const { data } = await axios.post(`http://localhost:3000/cart/addproduct/${productId}`, { quantity: count });
        return data;
    }
)

export const incrementCartProduct=createAsyncThunk(
    "cart/incrementCartProduct",
    async(params)=>{
        const id=params.cartId;
        const { data } = await axios.patch(`http://localhost:3000/cart/add/${id}?&query=inc`);
        return data;
    }
)

export const decrementCartProduct=createAsyncThunk(
    "cart/decrementCartProduct",
    async(params)=>{
        const id=params.cartId;
        const { data } = await axios.patch(`http://localhost:3000/cart/add/${id}?&query=dec`);
        return data;
    }
)

export const deleteCartProduct=createAsyncThunk(
    "cart/deleteCartProduct",
    async(params)=>{
        const id=params.cartId;
        const { data } = await axios.delete(`http://localhost:3000/cart/${id}`);
        return data;
    }
)

export default cartSlice.reducer;