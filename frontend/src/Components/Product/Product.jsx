import { useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import DetailProduct from "./DetailProduct";
import { FaHeart, FaHeartbeat } from 'react-icons/fa';

function Product({ product }) {
    const navigate = useNavigate();

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            w={{base:"90%",sm:"40%",md:"30%"}}
            h={"45vh"}
            my={3}
            position={"relative"}
            border={"2px solid #f4e5e7"}
        >
            <Image w={"100%"} h={"30vh"} src={product.images[0].url} fallbackSrc='https://via.placeholder.com/100' objectFit={"cover"} overflow={"hidden"} pointerEvents="none" />
            {/* <FaHeart style={{
                 position: 'absolute',
                 top: 0,
                 left: '50%',
                 transform: 'translateX(-50%)',
                 color: 'red', // Make the heart icon transparent
                 fontSize: '2rem', // Adjust the font size as needed
                 border: '2px solid white', // White outline
                 borderRadius: '50%', // Make it circular
                 padding: '0.1rem', // Adjust the padding for the outline
            }} /> */}
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                p={1}
                w={"100%"}
            >
                <Box
                    display={"flex"}
                    w={"70%"}
                    flexDir={"column"}
                >
                    <Text fontSize={"2xl"} fontFamily={"Work sans"} px={1} >{product.name}</Text>
                    <Text fontSize={"1xl"} fontFamily={"Work sans"} px={1} >{product.description}</Text>
                    <Button onClick={() => navigate(`/products/${product._id}`)} w={"60%"} >Read more<ArrowForwardIcon /></Button>
                </Box>
                <VStack
                    w={"30%"}
                    justifyContent={"space-between"}
                    p={1}
                >
                    <Text fontSize={"2xl"} fontFamily={"Work sans"} px={1} >${product.price}</Text>
                    <Button>B</Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default Product;