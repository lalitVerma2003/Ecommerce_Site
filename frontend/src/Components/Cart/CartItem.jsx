import React from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import CartProductBox from './CartProductBox';
import { useDispatch } from 'react-redux';
import { decrementCartProduct, incrementCartProduct } from '../../store/cartSlice/cartSlice';

const CartItem = ({ cart, fetchAgain, setFetchAgain }) => {

    const dispatch=useDispatch();

    const addQuantity = async (id) => {
        dispatch(incrementCartProduct({cartId:id}));
        setFetchAgain(!fetchAgain);
    }

    const deleteQuantity = async (id) => {
        dispatch(decrementCartProduct({cartId:id}));
        setFetchAgain(!fetchAgain);
    }

    return (
        <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            w={"100%"}
            h={"auto"}
        >
            <CartProductBox cart={cart} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            <HStack
                w={{ md: "60%", lg: "60%" }}
                h={"auto"}
                p={5}
                justifyContent={"space-between"}
            >
                <Box
                    w={"30%"}
                    h={"auto"}
                >
                    <Text textAlign={"center"} fontSize={"1.5rem"} >${cart.product.price}</Text>
                </Box>
                <HStack
                    w={"30%"}
                    justifyContent={"space-evenly"}
                >
                    <Button onClick={()=> addQuantity(cart._id)} >+</Button>
                    <Text textAlign={"center"} fontSize={"1.5rem"} >{cart.quantity}</Text>
                    <Button onClick={()=> deleteQuantity(cart._id)} >-</Button>
                </HStack>
                <Box
                    w={"30%"}
                >
                    <Text textAlign={"center"} fontSize={"1.5rem"} >${cart.quantity * cart.product.price}</Text>
                </Box>
            </HStack>
        </Box>
    )
}

export default CartItem;