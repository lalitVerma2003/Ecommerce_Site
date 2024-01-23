import { Box, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataState } from '../../config/DataProvider'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'

const PayButton = () => {

  const [total, setTotal] = useState("");
  const { user, cart, setCart } = DataState();
  const navigate = useNavigate();

  const handleCheckOut = async () => {
    if (!user) {
      navigate("/login");
    }

    try {
      const { data } = await axios.post("http://localhost:3000/stripe/create-checkout-session", {
        cartItems: cart,
        userId: user._id,
      });
      window.location.href = data.url;
    }
    catch (e) {
      console.log("Error in pay button");
    }
  }

  useEffect(() => {
    setTotal(cart.reduce((total, c) => total + c.quantity * c.product.price, 0));
  }, [cart]);

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      w={"20%"}
      m={5}
      p={5}
      // border={"2px solid red"}
    >
      <Text fontSize={"3xl"} fontFamily={"serif"} >Subtotal</Text>
      <Text fontSize={"3xl"} >$ {total}</Text>
      <Button w={"80%"} m={2} p={2} fontSize={"3xl"} fontFamily={"Work sans"} onClick={handleCheckOut} >{!user ? "Login for checkout" : "Checkout"}</Button>
      <Link to={"/home"} ><ArrowBackIcon boxSize={4} fontSize={"2xl"} fontFamily={"serif"} />  Continue shopping</Link>
    </Box>
  )
}

export default PayButton
