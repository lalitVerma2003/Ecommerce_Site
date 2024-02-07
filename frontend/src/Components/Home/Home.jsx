import { useEffect, useState } from "react";
import { Box, Image, useToast } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { DataState } from "../../config/DataProvider";
import Products from "../Product/Products";
import AdminProducts from "../Product/AdminProducts";
import Dots from "./Dots";

function Home() {

    const [imageIndex, setImageIndex] = useState(1);
    const { user} = DataState();
    const process = import.meta.env;

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("userInfo"));
        // if (user === null) {
        //     console.log("Not logged in");
        //     toast({
        //         title: 'Not logged in',
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //     })
        //     navigate("/login");
        //     return;
        // }
    }, []);

    useEffect(() => {
        const setImage = setTimeout(() => {
            handleNextImage();
        }, 3000);

        return () => {
            clearTimeout(setImage);
        }
    }, [imageIndex]);

    const handleNextImage = () => {
        imageIndex < 3 ? setImageIndex((idx) => idx + 1) : setImageIndex(1);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            width={"100%"}
            border={"2px solid black"}
            overflow={"hidden"}
        >
            <Navbar />
            {user.role === "admin" ? "" :
                <Box
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"100%"}
                    h={"auto"}
                    position={"relative"}
                >
                    <Image
                        w={"100%"}
                        h={{base:"50vh",md:"65vh",lg:"80vh"}}
                        objectFit='cover'
                        src={`../images/HomeImage${imageIndex}.jpg`}
                        alt='No'
                        opacity={"0.9"}
                    />
                    <Box
                        w={"10%"}
                        h={"auto"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        position={"absolute"}
                        top={"90%"}
                    >
                        <Dots activeIndex={imageIndex} index={1} setImageIndex={setImageIndex} />
                        <Dots activeIndex={imageIndex} index={2} setImageIndex={setImageIndex} />
                        <Dots activeIndex={imageIndex} index={3} setImageIndex={setImageIndex} />
                    </Box>
                </Box>}
            {user.role === "admin" ? <AdminProducts /> : <Products />}
            <Footer />
        </Box>
    );
}

export default Home;