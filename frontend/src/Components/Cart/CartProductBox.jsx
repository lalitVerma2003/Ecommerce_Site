import { Box, Image, Link, useToast, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { DataState } from '../../config/DataProvider'
import axios from 'axios'

const CartProductBox = ({product}) => {

    const {user}=DataState();
    const toast=useToast();

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

  return (
    <Box
        display={"flex"}
        // alignItems={"center"}
        w={"40%"}
        // border={"2px solid black"}
    >
        <Image src={product.images[0].url} boxSize={"40"} borderRadius={10} />
        <VStack
          w={"50%"}
          p={3}
          alignItems={"flex-start"}
          // border={"2px solid green"}
        >
            <Text m={1} fontSize={"2xl"} >{product.name}</Text>
            <Link m={1} onClick={() => removeFromCart(c._id)} >Remove</Link>
        </VStack>

    </Box>
  )
}

export default CartProductBox
