import { useEffect, useState } from "react";
import { Box, Button,  Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartProduct from "./CartProduct";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../../store/cartSlice/cartSlice";

axios.defaults.withCredentials = true;

function Cart() {

    const [fetchAgain, setFetchAgain] = useState(false);
    const user=useSelector(state=> state.user.user);
    const {cartData,loading}=useSelector(state=> state.cart);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return;
        }
        getCartProducts();
    }, [fetchAgain]);

    const getCartProducts = async () => {
        dispatch(fetchCartProducts());
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            width={"100%"}
            margin={"auto"}
        >
            <Navbar />
            <Text fontSize={"5xl"} fontFamily={"inherit"} w={{sm:"90%",md:"60%",lg:"40%"}} m={"auto"} textAlign={"center"} p={10} >Shopping Cart</Text>
            <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"auto"}
            >
                {loading ? (
                    <Spinner />
                ) : cartData.length !== 0 ?
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