import React, { Suspense, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import ImageSection from "./ImageSection";
import Product from "../Product/Product";
import { Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { fetchProducts } from '../../store/productSlice/productSlice';

const AdminProducts=React.lazy(()=> import('../Product/AdminProducts'));
const Products=React.lazy(()=> import('../Product/Products'));

function Home() {

    const user = useSelector(state => state.user.user);
    const { productData, loading, error } = useSelector(state => state.product);
    const process = import.meta.env;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts({ page: 1, limit: 9 }));
    },[]);

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            width={"100%"}
            border={"2px solid black"}
            overflow={"hidden"}
            minH={"100vh"}
        >
            <Navbar />
            {user?.role === "admin" ? "" :
                <>
                    <ImageSection />
                </>
            }
            <Suspense fallback={<div>Loading...</div>} >
                {user?.role === "admin" ?  <AdminProducts/>:(
                    <>
                        <Text fontSize={"3rem"} margin={"auto"} p={5} >Trending products</Text>
                    <Box
                        w={"90%"}
                        margin={"auto"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                        flexWrap={"wrap"}
                    >
                        {productData.map((p, i) => <Product key={i} product={p} />)}
                    </Box>
                    <Button>Load more</Button>
                    </>
                )}
                {/* (
                    <>
                        <Text fontSize={"3rem"} margin={"auto"} p={5} >Trending products</Text>
                    <Box
                        w={"90%"}
                        margin={"auto"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                        flexWrap={"wrap"}
                    >
                        {productData.map((p, i) => <Product key={i} product={p} />)}
                    </Box>
                    <Button>Load more</Button>
                    </>
                )  */}
            </Suspense>
            <Footer />
        </Box>
    );
}

export default Home;