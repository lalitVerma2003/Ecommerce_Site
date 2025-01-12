import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice.js';
import productReducer from './productSlice/productSlice.js';
import productSliceById from './productSlice/productSliceById.js';
import orderReducer from './orderSlice/orderSlice.js';
import cartReducer from './cartSlice/cartSlice.js';
import tokenReducer from "./tokenSlice/tokenSlice.js";
import { checkTokenExpire } from '../middleware/checkTokenExpire.js';

const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        productById:productSliceById,
        order:orderReducer,
        cart: cartReducer,
        token: tokenReducer
    },
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpire),
});

export default store;