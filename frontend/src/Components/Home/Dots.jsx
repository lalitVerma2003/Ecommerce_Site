import { Box } from '@chakra-ui/react'
import { easeIn } from 'framer-motion'
import React from 'react'

const Dots = ({index,activeIndex,setImageIndex}) => {
  return (
    <Box
        w={"25%"}
        h={"35px"}
        borderRadius={"50%"}
        // border={"2px solid red"}
        backgroundColor={activeIndex===index?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.6)"}
        onClick={()=> setImageIndex(index)}
    >
    </Box>
  )
}

export default Dots
