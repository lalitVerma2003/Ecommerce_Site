import { Box, Button, HStack, Image, Text, VStack, useToast, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Review from './Review';
import { IoIosStar } from 'react-icons/io';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProductById } from '../../store/productSlice/productSliceById';
import { addToCart } from '../../store/cartSlice/cartSlice';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

// axios.defaults.withCredentials = true;

const DetailProduct = () => {

  const [fetch,setFetch]=useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [count, setCount] = useState(1);
  const { productId } = useParams();
  const user=useSelector(state=> state.user.user);
  const navigate = useNavigate();
  const toast = useToast();
  const[rating,setRating]=useState(1);
  const {product,loading,error}=useSelector(state=> state.productById);
  const dispatch=useDispatch();

  useEffect(() => {
    getProduct();
  }, [user,fetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextImage();
    }, 3000);
    return () => {
      clearTimeout(timer);
    }
  }, [imageIndex, product]);

  const getProduct = async () => {
    dispatch(fetchProductById({productId}));
  }

  const addCart = async () => {
    if (!user) {
      toast({
        title: "Please login first",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return navigate("/login");
    }
    dispatch(addToCart({productId:productId,count:count}));
  }

  const deleteProduct = async () => {

    if (!user) {
      return;
    }
    try {
      const { data } = await axios.delete(`http://localhost:3000/products/${productId}`);
      toast({
        title: 'Product deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/home');
    }
    catch (err) {
      toast({
        title: 'Error while deleting product',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const updateProduct = async () => {

  }

  const handlePrevImage = () => {
    if (!product)
      return;
    imageIndex === 0 ? setImageIndex(product.images.length - 1) : setImageIndex(imageIndex - 1);
  }

  const handleNextImage = () => {
    if (!product)
      return;
    // console.log("Next Image");
    setImageIndex((imageIndex + 1) % product.images.length);
  }

  const calculateRating=()=> {
    let total=product.reviews.reduce((t,r)=> t+r.rating);
    console.log(total);
    setRating(total/(product.reviews.length));
  }

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      width={"100%"}
      h={"auto"}
      boxSizing={"border-box"}
      margin={"auto"}
    >
      <Navbar />
      {product &&
        <VStack
          alignItems={"center"}
          w={"100%"}
          // border={"2px solid green"}
        >
          <Box
            display={"flex"}
            flexDir={{base:"column",md:"row"}}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            // border={"2px solid red"}
          >
            <Box
              display={"flex"}
              w={{lg:"60%",md:"50%",base:"90%"}}
              h={"auto"}
              flexDir={"column"}
              border={"2px solid #f4e5e7"}
              boxSizing={"border-box"}
            >
              <Box
                w={"100%"}
                h={"75vh"}
                display={"flex"}
                alignItems={"center"}
                position={"relative"}
                // border={"2px solid green"}
                p={3}
              >
                <Button position={"absolute"} ml={"5%"} onClick={handlePrevImage} ><ChevronLeftIcon /></Button>
                {product && product.images.map((img, i) => (
                  <Image src={img.url} alt="error" w={"100%"} h={"70vh"} m={2} key={i} display={imageIndex === i ? "block" : "none"} objectFit={"cover"} overflow={"hidden"} />
                ))}
                <Button position={"absolute"} ml={"85%"} onClick={handleNextImage} ><ChevronRightIcon /></Button>
              </Box>
            </Box>

            <Box
              display={"flex"}
              flexDir={"column"}
              w={{md:"50%",lg:"40%",base:"90%"}}
              h={"auto"}
              boxSizing={"border-box"}
              border={"2px solid #f4e5e7"}
              p={3}
            >
              <Text fontSize={"4xl"} fontFamily={"Work sans"} m={1} p={2} >{product.name}</Text>
              <Text h={"25vh"} fontSize={"2xl"} fontFamily={"Work sans"} m={1} p={2} >-{product.description}</Text>
              <Text fontSize={"3xl"} fontFamily={"Work sans"} m={1} borderBottom={"2px solid #f4e5e7"} >${product.price}</Text>
              <Flex
                w={"20%"}
                flexDir={"column"}
                justify="flex-start"
                // border={"2px solid red"}
              >
                <Text fontSize={"1xl"} m={1} >Brand : {product.brand}</Text>
                <Text fontSize={"1xl"} m={1} display={"flex"} ><IoIosStar color="#FFD700" size={20} />Rating : {rating}</Text>
                <Text fontSize={"1xl"} m={1} >In stock : 100</Text>
              </Flex>

              <Flex
                my={3}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                {user?.role === "admin" ? (
                  <Box
                    w={"100%"}
                    h={"40%"}
                    display={"flex"}
                  >
                    <Button onClick={deleteProduct} backgroundColor={"red"} color={"white"} w={"40%"} h={"10vh"} fontSize={"2xl"} _hover={""} m={"auto"} >Delete</Button>
                    <Button onClick={updateProduct} backgroundColor={"#314cc2"} color={"white"} w={"40%"} h={"10vh"} fontSize={"2xl"} _hover={""} m={"auto"} >Update</Button>
                  </Box>
                ) : (
                  <Button onClick={addCart} backgroundColor={"#314cc2"} color={"white"} w={"30%"} h={"auto"} p={4} fontSize={"2xl"} _hover={""} >Add to cart</Button>
                )}
                <NumberInput size='md' maxW={24} defaultValue={1} min={1} onChange={(c) => setCount(c)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Box>
          </Box>
          <Review product={product} setFetch={setFetch} />
        </VStack>}
    </Box>
  )
}

export default DetailProduct