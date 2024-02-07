import { Box, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { DataState } from "../../config/DataProvider";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

axios.defaults.withCredentials = true;

const schema = z.object({
    name: z.string().min(2),
    description: z.string().min(5),
    price: z.string().min(1),
    brand: z.string().min(2),
    category: z.string().min(2),
})
function NewProduct() {

    const [images, setImages] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    const toast=useToast();

    const createProduct = async (product) => {
        console.log(product);
        try{
            if(!images){
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const formData = new FormData();
            formData.append("name",product.name);
            formData.append("description",product.description);
            formData.append("price",product.price);
            formData.append("brand",product.brand);
            formData.append("category",product.category);
            images.forEach((file)=>{
                formData.append("images",file);
            })
            const { data } = await axios.post("http://localhost:3000/products/new",formData,config);
            toast({
                title: 'Product crreated successfully',
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
        }
        catch(err){
            toast({
                title: 'Product not create',
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
        }
    }

    const setPic = (pictures) => {
        if (!pictures) {
            console.log("Choose Pics");
        }
        var result = Object.keys(pictures).map((key) => pictures[key]);
        console.log("Hello", result);
        setImages(result);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            w={"100%"}
            margin={"auto"}
        >
            <Navbar />
            <Box
                display={"flex"}
                flexDir={"column"}
                border={"2px solid red"}
                p={2}
                m={3}
                w={"80%"}
                h={"auto"}
                borderRadius={10}
            >
                <Text fontSize={"5xl"} fontFamily={"serif"} mx={"auto"} p={3} >Create New Product</Text>
                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter name:</FormLabel>
                    <Input placeholder='enter product name' type='text' m={1} w={"90%"} {...register("name")} />
                </FormControl>
                {errors.name && <Text m={2} color={"red"} >*{errors.name.message}</Text>}

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter description:</FormLabel>
                    <Input placeholder='enter product description' type='text' m={1} w={"90%"} {...register("description")} />
                </FormControl>
                {errors.description && <Text m={2} color={"red"} >*{errors.description.message}</Text>}

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter price:</FormLabel>
                    <Input placeholder='enter product price' type='number' m={1} w={"90%"} {...register("price")} />
                </FormControl>
                {errors.price && <Text m={2} color={"red"} >*{errors.price.message}</Text>}

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Choose image:</FormLabel>
                    <Input type='file' m={1} w={"90%"} onChange={(e) => setPic(e.target.files)} multiple />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter brand:</FormLabel>
                    <Input placeholder='enter brand' type='text' m={1} w={"90%"} {...register("brand")} />
                </FormControl>
                {errors.brand && <Text m={2} color={"red"} >*{errors.brand.message}</Text>}

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter category:</FormLabel>
                    <Input placeholder='enter category' type='text' m={1} w={"90%"} {...register("category")} />
                </FormControl>
                {errors.category && <Text m={2} color={"red"} >*{errors.category.message}</Text>}

                <Button w={"30%"} h={"50px"} mx={"auto"} my={6} onClick={handleSubmit(createProduct)} isDisabled={isSubmitting ? true : false}  >{isSubmitting?"Creating":"Submit"}</Button>
            </Box>
        </Box>
    );
}

export default NewProduct;