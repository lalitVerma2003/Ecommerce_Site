import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    orders:[],
    loading: false,
    error: null
};

const orderSlice=createSlice({
    name: "order",
    initialState,   
    reducres:{},
    extraReducers:builder=>{
        builder
        .addCase(fetchOrders.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchOrders.fulfilled,(state,action)=>{
            const orders=action.payload;
            // console.log(action.payload);
            state.orders=orders;
            state.loading=false;
        })
        .addCase(fetchOrders.rejected,(state)=>{
            state.loading=false;
            state.error="Error in order slice";
        })
    }
})

export const fetchOrders=createAsyncThunk(
    "order/fetchOrders",
    async(params)=>{
        const {data}=await axios.get("http://localhost:3000/orders");
        return data;
    }
)

export default orderSlice.reducer;