import { Box, useToast } from '@chakra-ui/react'
import React from 'react'
import PayButton from './PayButton';
import axios from 'axios';
import CartItem from './CartItem';
import { Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const CartProduct = ({ fetchAgain, setFetchAgain }) => {

  const user=useSelector(state=> state.user.user);
  const {cartData}=useSelector(state=> state.cart);
  const toast = useToast();

  return (
    <>
      <Box
        w={"100%"}
        h={"auto"}
      >
        <Stack spacing="6" w={{md:"90%",lg:"80%"}} m={"auto"} >
          {cartData?.map((item, id) => (
            <CartItem key={id} cart={item} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          ))}
        </Stack>
      </Box>
      <PayButton />
    </>
  )
}

export default CartProduct;