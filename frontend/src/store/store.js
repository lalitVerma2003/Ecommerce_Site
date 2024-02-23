import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice.js';
import productReducer from './productSlice/productSlice.js';
import productSliceById from './productSlice/productSliceById.js';
import orderReducer from './orderSlice/orderSlice.js';
import cartReducer from './cartSlice/cartSlice.js';

const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        productById:productSliceById,
        order:orderReducer,
        cart: cartReducer
    }
});

export default store;