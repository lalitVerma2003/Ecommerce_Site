import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { DataState } from "../../config/DataProvider";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import axios from "axios";
import { Text } from "@chakra-ui/react";

axios.defaults.withCredentials = true;

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = DataState();

    const createProduct = async () => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        // setLoading(true);
        console.log("Images:", images);
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);
        formData.append("brand",brand);
        formData.append("category",category);
        images.forEach((file)=>{
            formData.append("images",file);
        })
        console.log(formData);
        const { data } = await axios.post("http://localhost:3000/products/new",formData,config);
        console.log("Product made", data);
        // setLoading(false);
    }

    const setPic = (pictures) => {
        if (!pictures) {
            console.log("Choose Pics");
        }
        // convert object of images to array of images
        var result = Object.keys(pictures).map((key) => pictures[key]);
        console.log("Hello", result);
        setImages(result);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            w={"80%"}
            margin={"auto"}
        >
            <Navbar />
            <Box
                display={"flex"}
                flexDir={"column"}
                border={"2px solid red"}
                p={2}
                w={"100%"}
                h={"110vh"}
            >
                <Text fontSize={"3xl"} fontFamily={"Work sans"} mx={"auto"} >Create New Product</Text>
                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter name:</FormLabel>
                    <Input placeholder='enter product name' value={name} type='text' m={1} w={"90%"} onChange={(e) => setName(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter description:</FormLabel>
                    <Input placeholder='enter product description' value={description} type='text' m={1} w={"90%"} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter price:</FormLabel>
                    <Input placeholder='enter product price' value={price} type='text' m={1} w={"90%"} onChange={(e) => setPrice(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Choose image:</FormLabel>
                    <Input type='file' m={1} w={"90%"} onChange={(e) => setPic(e.target.files)} multiple />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter brand:</FormLabel>
                    <Input placeholder='enter brand' value={brand} type='text' m={1} w={"90%"} onChange={(e) => setBrand(e.target.value)} />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter category:</FormLabel>
                    <Input placeholder='enter category' value={category} type='text' m={1} w={"90%"} onChange={(e) => setCategory(e.target.value)} />
                </FormControl>

                <Button w={"30%"} h={"50px"} mx={"auto"} my={6} onClick={createProduct} isDisabled={loading ? true : false}  >Submit</Button>
            </Box>
        </Box>
    );
}

export default NewProduct;