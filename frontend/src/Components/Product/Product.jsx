import { useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text } from "@chakra-ui/react";
import DetailProduct from "./DetailProduct";

function Product({ product }) {
    const navigate = useNavigate();

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            w={"28%"}
            h={"auto"}
            m={8}
            border={"2px solid #f4e5e7"}
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <Image boxSize="320px" src={product.images[0].url} fallbackSrc='https://via.placeholder.com/100' objectFit={"cover"} overflow={"hidden"} m={2} />
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                p={1}
                w={"100%"}
            >
                <Box
                    display={"flex"}
                    flexDir={"column"}
                >
                    <Text fontSize={"2xl"} fontFamily={"Work sans"} px={1} >{product.name}</Text>
                    <Text fontSize={"2xl"} fontFamily={"Work sans"} px={1} >R</Text>
                </Box>
                <Text fontSize={"2xl"} fontFamily={"Work sans"} px={1} >${product.price}</Text>
            </Box>
        </Box>
    );
}

export default Product;