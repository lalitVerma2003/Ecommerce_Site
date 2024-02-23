import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    product: null,
    loading: false,
    error: null
}

const productSliceById=createSlice({
    name:"productById",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(fetchProductById.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProductById.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.product=action.payload;
            state.loading=false;
        })
        .addCase(fetchProductById.rejected,(state)=>{
            state.loading=false;
            state.error="Error on product slice by id";
        })
    }
})

export const fetchProductById=createAsyncThunk(
    "productById/fetchProductById",
    async(params)=>{
        const {productId}=params;
        const { data } = await axios.get(`http://localhost:3000/products/${productId}`);
        return data;
    }
)

export default productSliceById.reducer;