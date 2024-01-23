import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom';
import { IconButton, Checkbox } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';


const Categories = ({ fetchAgain, setFetchAgain }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isBrand, setIsBrand] = useState(true);
  const [isCategory, setIsCategory] = useState(true);
  const brands = ["Apple", "Oppo", "Sansung", "Nike", "Boat"];
  const categories=["Headphone","Phone","Shirt","Airpods"];

  useEffect(() => {
    setFetchAgain(!fetchAgain);
    setSearchParams("");
  }, []);

  const handleBrandChange = (e) => {
    console.log("Brand", e.target.value);
    setSearchParams(...searchParams, { brand: e.target.value });
    setFetchAgain(!fetchAgain);
  }

  const handleCategoryChange = (e) => {
    console.log("Category", e.target.value);
    setSearchParams({ category: e.target.value });
    setFetchAgain(!fetchAgain);
  }

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      // alignItems={"center"}
      w={"20%"}
      border={"2px solid #f4e5e7"}
      h={"150vh"}
      py={10}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        m={3}
        p={3}
        borderBottom={"2px solid #f4e5e7"}
      >
        <Text fontSize={"2xl"} fontFamily={"Work sans"} p={1} >Brands :</Text>
        {isBrand ? (
          <IconButton icon={<AddIcon />} boxSize={"6"} m={2} onClick={() => setIsBrand(!isBrand)} />
        ) : (
          <IconButton as={"button"} icon={<MinusIcon />} boxSize={"6"} m={2} onClick={() => setIsBrand(!isBrand)} />
        )}
      </Box>
      {!isBrand && <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
      >
        {brands.map((brand, id) => <Checkbox key={id} size={"lg"} fontSize={"1xl"} fontFamily={"Work sans"} m={1} >{brand}</Checkbox>)}
      </Box>}

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        m={3}
        p={3}
        borderBottom={"2px solid #f4e5e7"}
      >
        <Text fontSize={"2xl"} fontFamily={"Work sans"} p={1} >Categories :</Text>
        {isCategory ? (
          <IconButton icon={<AddIcon />} boxSize={"6"} m={2} onClick={() => setIsCategory(!isCategory)} />
        ) : (
          <IconButton as={"button"} icon={<MinusIcon />} boxSize={"6"} m={2} onClick={() => setIsCategory(!isCategory)} />
        )}
      </Box>
      {!isCategory && <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
      >
        {categories.map((category, id) => <Checkbox key={id} size={"lg"} fontSize={"1xl"} fontFamily={"Work sans"} m={1} >{category}</Checkbox>)}
      </Box>}
    </Box>
  )
}

export default Categories
