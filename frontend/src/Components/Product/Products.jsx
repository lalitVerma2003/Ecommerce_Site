import React, { useEffect, useState } from 'react'
import { DataState } from '../../config/DataProvider';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import Categories from './Categories';
import Product from './Product';

// for every request (for implementing cookie)
axios.defaults.withCredentials = true;


const Products = () => {
    // const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [fetchAgain, setFetchAgain] = useState(false);
    const [page, setPage] = useState(1);
    const [totalData,setTotalData]=useState();
    const limit = 6;

    const { user, productData, setProductData } = DataState();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [fetchAgain, page]);

    const getData = async () => {
        // try {
        if (!user) {
            return;
        }
        const config = {
            headers: {
                "Content-type": "application.json"
            },
            withCredentials: true
        }
        // const { data } = await axios.get(`http://localhost:3000/products/all?${searchParams}`);
        const {data} = await axios.get(`http://localhost:3000/products/all?${searchParams}&page=${page}&limit=${limit}`);
        if (data.length != 0)
            setProductData(data.productData);
        setTotalData(data.total);
        setLoading(false);
        // }
        // catch (err) {
        //     toast({
        //         title: 'Error while fetching products',
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //       })
        // }
    }

    const handlePageClick = () => {

    }

    const handlePrevData = () => {
        if (page == 1)
            return;
        setPage((page) => page - 1);
    }

    const handleNextData = () => {
        if (page > totalData/limit)
            return;
        setPage((page) => page + 1);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            w={"100%"}
            h={"auto"}
            // border={"2px solid #f4e5e7"}
        >
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                w={"auto"}
                h={"auto"}
                mx={5}
            // border={"2px solid green"}
            >
                <Text
                    fontSize={'4xl'}
                    fontFamily={"Work sans"}
                    fontWeight={"bold"}
                    mt={10}
                >All Products</Text>
                <Text
                    fontSize={'3xl'}
                    fontFamily={"Work sans"}
                    mt={10}
                >Sort by</Text>
            </Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                w={"100%"}
                // border={"2px solid green"}
                h={"auto"}
            >
                <Categories fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    w={"80%"}
                    h={"auto"}
                    py={5}
                    // border={"2px solid red"}
                >
                    {productData.map((p, i) => <Product key={i} product={p} />)}
                </Box>
            </Box>
            <Box
                w={"90%"}
                h={"auto"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                m={"auto"}
                my={5}
                // border={"2px solid black"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    w={"40%"}
                    h={"auto"}
                    backgroundColor={"#edf2f7"}
                    // border={"2px solid red"}
                >
                    <Button onClick={handlePrevData} mx={5} >prev</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={1} >1</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={2} >2</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={3} >3</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={4} >4</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={5} >5</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={6} >6</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={0} >...</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={(Math.floor(totalData/limit)+1)} >{Math.floor(totalData/limit)+1}</Button>
                    <Button onClick={handleNextData} mx={5} >next</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Products
