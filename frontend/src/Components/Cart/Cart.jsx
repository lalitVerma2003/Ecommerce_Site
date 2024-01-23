import { Box, Button, VStack } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { DataState } from "../../config/DataProvider";
import axios from "axios";
import { Text, Image } from "@chakra-ui/react";
import CartProduct from "./CartProduct";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Cart() {

    const [fetchAgain, setFetchAgain] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, cart, setCart } = DataState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // console.log("After");
            return;
        }
        getCartProducts();
    }, [user, fetchAgain]);

    const getCartProducts = async () => {
        // console.log("Function called");
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/cart/show");
        console.log(data);
        setCart(data);
        setLoading(false);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            width={"100%"}
            margin={"auto"}
        >
            <Navbar />
            <Text fontSize={"5xl"} fontFamily={"inherit"} w={"40%"} m={"auto"} textAlign={"center"} p={10} >Shopping Cart</Text>
            <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"auto"}
            >
                {loading ? (
                    <Text>loading</Text>
                ) : cart.length !== 0 ?
                    (
                        <CartProduct fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    )
                    : (
                        <>
                            <Text fontSize={"3xl"} fontFamily={"Work sans"} m={2} p={2} >Your cart is empty. Keep shopping to find a good product!</Text>
                            <Button fontSize={"2xl"} fontFamily={"Work sans"} color={"white"} backgroundColor={"blue"} p={1} m={2} w={"15%"} h={"50px"} onClick={() => navigate("/home")} >Shop Now</Button>
                        </>
                    )
                }
            </Box>
        </Box>
    );
}

export default Cart;