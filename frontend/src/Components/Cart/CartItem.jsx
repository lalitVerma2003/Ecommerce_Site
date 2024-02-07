import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import CartProductBox from './CartProductBox';

const CartItem = ({ product, quantity, user }) => {
    return (
        <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            w={"100%"}
            h={"auto"}
            // border={"2px solid red"}
        >
                <CartProductBox product={product} />
            {/* Desktop */}
            <Box
                w={"60%"}
                display={{base:"none",md:"flex"}}
                border={"2px solid red"}
            >
                <Text border={"2px solid green"} w={"33%"}  >$ {product.price}</Text>
                <Text border={"2px solid green"} w={"33%"} textAlign="center" mt="auto" mb={"auto"} >{quantity}</Text>
                <Text border={"2px solid green"} w={"33%"} >{quantity*product.price}</Text>
            </Box>
            {/* Mobile */}
            <Box    
                display={{base:"flex",md:"none"}}
                border={"2px solid red"}
            >

            </Box>
        </Box>
    )
}

export default CartItem
