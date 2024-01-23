import React from 'react'
import { useState } from 'react';
import { Box, Text } from "@chakra-ui/react";

const NavbarItem = ({ itemName,fontSize }) => {

    const [isHovered,setIsHovered]=useState(false);
    const navStyles = {
        color: "white",
        fontFamily: "inherit",
        testDecoration:"none",
        transition: 'all 0.3s ease',
        ...(isHovered&&{
            fontFamily: "inherit",
            color:"black",
            backgroundColor:"white",
            borderRadius:"20px"
        })
    };

    return (
        <Box
            w={"150%"}
            my={{base:"4"}}
            textAlign={"center"}
            onMouseEnter={()=> setIsHovered(!isHovered)}
            onMouseLeave={()=> setIsHovered(!isHovered)}
        >
                <Text style={navStyles} fontSize={fontSize} >{itemName}</Text>
        </Box>
    )
}

export default NavbarItem
