import React, { useEffect, useState } from 'react'
import { Box, Button, Text, HStack, useToast, Select, useDisclosure, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import Categories from './Categories';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice/productSlice';
import Pagination from './Pagination';

// axios.defaults.withCredentials = true;

const Products = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [page, setPage] = useState(1);
    const { productData, loading, error } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [sortMethod, setSortMethod] = useState(() => () => { });
    const toast = useToast();
    const limit = 9;

    useEffect(() => {
        getData();
    }, [page, brand, category]);

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth >= 992)
                onClose();
        }
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener("resize", handleSize);
        }
    }, []);

    const getData = async () => {
        const queryParams = new URLSearchParams();
        if (brand)
            queryParams.append("brand", brand);
        if (category)
            queryParams.append("category", category);
        dispatch(fetchProducts({ page: page, limit: 9, queryParams }));
        if (error)
            toast({
                title: error,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
    }

    const handleSorting = (e) => {
        let s = e.target.value;
        if (s == 'inc')
            setSortMethod(() => (a, b) => a.price - b.price);
        else if (s == 'dec')
            setSortMethod(() => (a, b) => b.price - a.price);
        else
            setSortMethod(() => () => { });
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
                m={3}
            >
                <Button display={{ base: "block", lg: "none" }} my={4} fontSize={"2xl"} fontFamily={"serif"} onClick={onOpen} borderRadius={"50%"} ><FaFilter color='#38b6ff' /></Button>
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
                <HStack
                    w={{ md: "30%", lg: "20%" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        fontSize={"2rem"}
                        fontFamily={"Work sans"}
                    >Sort by:</Text>
                    <Select placeholder='No Filter' onChange={(e) => handleSorting(e)} w={"50%"} >
                        <option value='inc'>Price: low to high</option>
                        <option value='dec'>Price: high to low</option>
                    </Select>
                </HStack>
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
                    h={"150vh"}
                    py={1}
                    border={"2px solid #f4e5e7"}
                >
                    {productData.toSorted(sortMethod).map((p, i) => <Product key={i} product={p} />)}
                </Box>
            </Box>
            <Pagination page={page} setPage={setPage} limit={9} />
        </Box>
    )
}

export default Products