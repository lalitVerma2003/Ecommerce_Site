import { Box, Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Image, Text, VStack } from '@chakra-ui/react'
import { DataState } from '../../config/DataProvider';
import { useParams, Link } from 'react-router-dom';
import PayButton from './PayButton';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

axios.defaults.withCredentials = true;

const CartProduct = ({ fetchAgain, setFetchAgain }) => {

  const { user, cart, setCart } = DataState();
  const toast = useToast();

  useEffect(() => {
  }, []);

  const handleCart = async (e) => {
    // console.log(e.target.outerText);
    if (e.target.outerText === "-")
      setCount(count - 1);
    else
      setCount(count + 1);
    addToCart();
  }

  const addToCart = async () => {
    if (!user) {
      return;
    }
    try {
      //   console.log("User in add cart", user);
      console.log("Add to cart func");
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }
      const { data } = await axios.post(`http://localhost:3000/cart/addproduct/${productId}`, { quantity: count }, config);
      //   console.log("Data added", data);
    }
    catch (err) {
      console.log("Error in add to cart");
    }
  }

  const removeFromCart = async (id) => {
    if (!user) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }
      const { data } = await axios.delete(`http://localhost:3000/cart/${id}`, config);
      setFetchAgain(!fetchAgain);
      toast({
        title: 'Removed from cart successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "bottom-left"
      })
    }
    catch (err) {
      console.log("Error on deleting from cart");
    }
  }

  const addQuantity = async (id) => {
    console.log("Before cart", cart);
    const { data } = await axios.patch(`http://localhost:3000/cart/add/${id}?&query=inc`);
    console.log(data);
    setFetchAgain(!fetchAgain);
    // setCart(cart.map((c)=> c._id==id?data:c ));
    // console.log("After cart",cart);
  }

  const deleteQuantity = async (id) => {
    console.log("Before cart", cart);
    const { data } = await axios.patch(`http://localhost:3000/cart/add/${id}?&query=dec`);
    console.log(data);
    setFetchAgain(!fetchAgain);
    // setCart(cart.map((c)=> c._id==id?data:c ));
    // console.log("After cart",cart);
  }

  return (
    <>
      <TableContainer
        w={"90%"}
        boxSizing="border-box"
      >
        <Table variant='simple' w={"100%"} >
          <Thead
            w={"100%"}
            h={"auto"}
            p={3}
          >
            <Tr>
              <Th w={"40%"} fontSize={"2xl"} fontFamily={"inherit"} >Product</Th>
              <Th w={"20%"} fontSize={"2xl"} fontFamily={"inherit"} >Price</Th>
              <Th w={"20%"} fontSize={"2xl"} fontFamily={"inherit"} >Quantity</Th>
              <Th w={"20%"} fontSize={"2xl"} fontFamily={"inherit"} >Total</Th>
            </Tr>
          </Thead>
          <Tbody
            m={3}
            p={3}
          >
            {cart?.map((c, id) =>
              <Tr key={id} >
                <Td display={"flex"} >
                  <Image src={c.product.images[0].url} boxSize={"150px"} borderRadius={5} />
                  <VStack
                  >
                    <Text fontFamily={"serif"} fontSize={"2xl"} m={5} >{c.product.name}</Text>
                    <Link onClick={() => removeFromCart(c._id)} >Remove</Link>
                  </VStack>
                </Td>
                <Td fontSize={"2xl"}>$ {c.product.price}</Td>
                <Td>
                  <Box display={"flex"} w={"60%"} justifyContent={"space-around"} alignItems={"center"} >
                    <Button onClick={() => deleteQuantity(c._id)}>-</Button>
                    <Text fontSize={"2xl"} w={"100%"} textAlign={"center"} >{c.quantity}</Text>
                    <Button onClick={() => addQuantity(c._id)} >+</Button>
                  </Box>
                </Td>
                <Td fontSize={"2xl"}>$ {c.quantity * c.product.price}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <PayButton />
    </>
  )
}

export default CartProduct;