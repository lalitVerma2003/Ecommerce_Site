import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/orderSlice/orderSlice';
import { Box, Text, VStack } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';
import OrderItem from './OrderItem';

const MyOrders = () => {

  const user = useSelector(state => state.user.user);
  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
  }, [user]);

  const getOrders = () => {
    dispatch(fetchOrders());
  }
  console.log("Orders", orders);

  return (
    <VStack
      justifyContent={"center"}
    >
      <Navbar />
      <VStack
        w={"80%"}
        alignItems={"flex-start"}
        border={"2px solid #f4e5e7"}
      >
        <Text fontSize={"3rem"} fontFamily={"sans-serif"} m={3} >All orders({orders.length})</Text>
        <VStack
          w={"100%"}
        >
          {orders?.map((order, idx) => (
            <OrderItem order={order} key={idx} />
          ))}
        </VStack>
      </VStack>

    </VStack>
  )
}

export default MyOrders;