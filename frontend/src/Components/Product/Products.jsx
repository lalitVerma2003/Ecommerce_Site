import React, { useEffect, useState } from 'react'
import { DataState } from '../../config/DataProvider';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import Categories from './Categories';
import Product from './Product';
import { FaFilter } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

axios.defaults.withCredentials = true;

const Products = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState();
    const limit = 9;

    const { user, productData, setProductData } = DataState();
    const toast = useToast();

    useEffect(() => {
        getData();
    }, [page, brand, category]);

    useEffect(()=>{
        const handleSize=()=>{
            if(window.innerWidth>=992)
                onClose();
        }
        window.addEventListener("resize",handleSize);
        return ()=>{
            window.removeEventListener("resize",handleSize);
        }
      },[]);

    const getData = async () => {
        try {
            if (!user) {
                return;
            }
            const queryParams = new URLSearchParams();
            if (brand)
                queryParams.append("brand", brand);
            if (category)
                queryParams.append("category", category);
            const { data } = await axios.get(`http://localhost:3000/products/all?${queryParams.toString()}&page=${page}&limit=${limit}`);
            if (data.length != 0)
                setProductData(data.productData);
            setTotalData(data.total);
            setLoading(false);
        }
        catch (err) {
            toast({
                title: 'Error while fetching products',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const handlePrevData = () => {
        if (page == 1)
            return;
        setPage((page) => page - 1);
    }

    const handleNextData = () => {
        if (page > totalData / limit)
            return;
        setPage((page) => page + 1);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            w={"100%"}
            h={"auto"}
        >
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
                w={"auto"}
                h={"auto"}
                mx={5}
            >
                <Button display={{ base: "block", lg: "none" }} my={4} fontSize={"2xl"} fontFamily={"serif"} onClick={onOpen} borderRadius={"50%"} ><FaFilter color='#38b6ff'/></Button>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody
                            p={5}
                            display={"flex"}
                            flexDir={"column"}
                            alignItems={"center"}
                        >
                            <Categories brand={brand} setBrand={setBrand} category={category} setCategory={setCategory} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
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
                alignItems={"flex-start"}
                w={"100%"}
                h={"auto"}
            >
                <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDir={"column"}
                    alignItems={"center"}
                    w={"20%"}
                    py={10}
                >
                    <Categories brand={brand} setBrand={setBrand} category={category} setCategory={setCategory} />
                </Box>
                <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-evenly"}
                    w={{ base: "100%", lg: "80%" }}
                    h={"auto"}
                    py={1}
                    border={"2px solid #f4e5e7"}
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
            >
                <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    w={"40%"}
                    h={"auto"}
                    backgroundColor={"#edf2f7"}
                >
                    <Button onClick={handlePrevData} mx={5} >prev</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={1} >1</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={2} >2</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={3} >3</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={4} >4</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={5} >5</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={6} >6</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={0} >...</Button>
                    <Button onClick={(e) => setPage(e.target.value)} value={`${Math.floor(totalData / limit) + 1}`} >{Math.floor(totalData / limit) + 1}</Button>
                    <Button onClick={handleNextData} mx={5} >next</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Products
