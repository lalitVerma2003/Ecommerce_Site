import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom';
import { IconButton, Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';



const Categories = ({ brand, setBrand, category, setCategory }) => {

  
  const [isBrand, setIsBrand] = useState(true);
  const [isCategory, setIsCategory] = useState(true);
  const brands = ["Apple", "Oppo", "Samsung", "Nike", "Boat"];
  const categories = ["Headphone", "Phone", "Shirt", "Airpods"];

  const handleBrandChange = (e) => {
    setBrand(e.target.value == brand ? null : e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value == category ? null : e.target.value);
  }

  const resetFilter=()=>{
    setBrand(null);
    setCategory(null);
  }

  return (
    <>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          w={"90%"}
          m={3}
          p={3}
          borderBottom={"2px solid #f4e5e7"}
        >
          <Button w={"100%"} borderRadius={20} fontSize={"2xl"} fontFamily={"sans-serif"} p={1} onClick={() => setIsBrand(!isBrand)} >Filter by brand</Button>
        
        {!isBrand && <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
        >
          {brands.map((b, id) => <Checkbox key={id} size={"lg"} value={b} fontSize={"1xl"} fontFamily={"Work sans"} m={1} onChange={(e) => handleBrandChange(e)} isChecked={brand === b} >{b}</Checkbox>)}
        </Box>}
        </VStack>

        <VStack
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          m={3}
          p={3}
          w={"90%"}
          borderBottom={"2px solid #f4e5e7"}
        >
          <Button w={"100%"} borderRadius={20} fontSize={"2xl"} fontFamily={"sans-serif"} p={1} onClick={() => setIsCategory(!isCategory)} >Filter by category</Button>
        
        {!isCategory && <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
        >
          {categories.map((c, id) => <Checkbox key={id} size={"lg"} value={c} fontSize={"1xl"} fontFamily={"Work sans"} m={1} onChange={(e) => handleCategoryChange(e)} isChecked={category === c} >{c}</Checkbox>)}
        </Box>}
        </VStack>
        <Button w={"60%"} onClick={resetFilter} >Remove all filters</Button>
    </>
  )
}

export default Categories
