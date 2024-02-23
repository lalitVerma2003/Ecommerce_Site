import { Box, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'

const PayButton = () => {

  const [total, setTotal] = useState("");
  const user=useSelector(state=> state.user.user);
  const {cartData}=useSelector(state=> state.cart);
  const navigate = useNavigate();

  const handleCheckOut = async () => {
    if (!user) {
      navigate("/login");
    }

    try {
      const { data } = await axios.post("http://localhost:3000/stripe/create-checkout-session", {
        cartItems: cartData,
        userId: user._id,
      });
      window.location.href = data.url;
    }
    catch (e) {
      console.log("Error in pay button");
    }
  }

  useEffect(() => {
    setTotal(cartData.reduce((total, c) => total + c.quantity * c.product.price, 0));
  }, [cartData]);

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      w={{sm:"60%",md:"40%",lg:"30%"}}
      m={5}
      p={5}
    >
      <Text fontSize={"2.5rem"} fontFamily={"serif"} >Subtotal</Text>
      <Text fontSize={"1.5rem"} >$ {total}</Text>
      <Button w={{sm:"40%",md:"60%",lg:"80%"}} m={2} p={2} fontSize={"1.5rem"} fontFamily={"Work sans"} onClick={handleCheckOut} >{!user ? "Login for checkout" : "Checkout"}</Button>
      <Link to={"/home"} ><ArrowBackIcon boxSize={4} fontSize={"2xl"} fontFamily={"serif"} />  Continue shopping</Link>
    </Box>
  )
}

export default PayButton
