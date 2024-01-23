import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import Product from './Product';
import { DataState } from '../../config/DataProvider';

axios.defaults.withCredentials=true;

const AdminProducts = () => {

    const [products,setProducts]=useState([]);
    const {user}=DataState();

    useEffect(()=>{
        getProducts();
    },[user])

    const getProducts=async()=>{
        if(!user){
            return;
        }
        console.log('Feching data...');
        console.log("User in getData",user);
        // const config={
        //     headers:{
        //         Authorization: `Bearer ${user.token}`
        //     }
        // }
        const {data}=await axios.get(`http://localhost:3000/products/all`);
        setProducts(data);
        console.log(data);
    }

    return (
        <Box 
            display={"flex"}
            flexWrap={"wrap"}
            w={"100%"}
            h={"auto"}
            border={"2px solid red"}
        >
            {products.map((p,i)=> <Product key={i} product={p} /> )}
        </Box>
    )
}

export default AdminProducts
