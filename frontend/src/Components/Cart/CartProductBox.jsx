import React from 'react'
import { Box, Image, Link, useToast, Text, VStack } from '@chakra-ui/react'
import {useDispatch, useSelector} from 'react-redux';
import { deleteCartProduct } from '../../store/cartSlice/cartSlice';

const CartProductBox = ({cart,fetchAgain,setFetchAgain}) => {

    const user=useSelector(state=> state.user.user);
    const dispatch=useDispatch();
    const toast=useToast();

    const removeFromCart = async (id) => {
        if (!user) {
          return;
        }
        setFetchAgain(!fetchAgain);
        dispatch(deleteCartProduct({cartId:id}));
      }

  return (
    <Box
        display={"flex"}
        w={"40%"}
        p={2}
    >
        <Image src={cart.product.images[0].url} boxSize={"40"} borderRadius={10} />
        <VStack
          w={"50%"}
          p={3}
          alignItems={"flex-start"}
        >
            <Text m={1} fontSize={"2xl"} >{cart.product.name}</Text>
            <Link m={1} onClick={() => removeFromCart(cart._id)} >Remove</Link>
        </VStack>

    </Box>
  )
}

export default CartProductBox
