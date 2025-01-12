import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice/productSlice';

// axios.defaults.withCredentials=true;

const AdminProducts = () => {
    const user=useSelector(state=> state.user.user);
    const {productData,loading,total,error}=useSelector(state=> state.product);
    const dispatch=useDispatch();

    useEffect(()=>{
        getProducts();
    },[user]);

    const getProducts=async()=>{
        if(!user){
            return;
        }
        dispatch(fetchProducts({page:1,limit:9}));
    }

    return (
        <Box 
            display={"flex"}
            flexWrap={"wrap"}
            w={"100%"}
            h={"auto"}
            flexGrow={1}
            justifyContent={"space-evenly"}
        >
            {productData.map((p,i)=> <Product key={i} product={p} /> )}
        </Box>
    )
}

export default AdminProducts
