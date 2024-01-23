import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Box, Image, useToast } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { DataState } from "../../config/DataProvider";
import Products from "../Product/Products";
import AdminProducts from "../Product/AdminProducts";
import Dots from "./Dots";

function Home() {

    const [imageIndex, setImageIndex] = useState(1);

    const { user, setUser } = DataState();
    const toast = useToast();
    const navigate = useNavigate();
    const process = import.meta.env;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user === null) {
            console.log("Not logged in");
            toast({
                title: 'Not logged in',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            navigate("/login");
            return;
        }
    }, []);

    useEffect(() => {
        const setImage = setTimeout(() => {
            // console.log("Change image");
            handleNextImage();
        }, 3000);

        return () => {
            clearTimeout(setImage);
        }
    }, [imageIndex]);

    const handleNextImage = () => {
        imageIndex < 3 ? setImageIndex((idx) => idx + 1) : setImageIndex(1);
    }


    // const handleCategoryChange = (e) => {
    //     if (e.target.checked) {
    //         console.log("Clicked");
    //         setSearchParams({ category: e.target.value });
    //     }
    //     else {
    //         const { category, ...newObject } = searchParams;
    //         setSearchParams(newObject);
    //     }
    // }

    const handleBrandChange = (e) => {
        if (e.target.checked) {
            setSearchParams({ brand: e.target.value });
        }
        else {
            const { brand, ...newObject } = searchParams;
            setSearchParams(newObject);
        }
    }

    const handlePagination = (event, value) => {
        setSearchParams({
            page: value
        });
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            width={"100%"}
            // margin={"auto"}
            border={"2px solid black"}
            overflow={"hidden"}
        >
            <Navbar />
            {user.role === "admin" ? "" : <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"80vh"}
            // border={"2px solid black"}
            >
                <Image
                    w={"100%"}
                    h={"80vh"}
                    objectFit='cover'
                    src={`../images/HomeImage${imageIndex}.jpg`}
                    alt='No'
                    opacity={"0.9"}
                    position={"relative"}
                />
                <Box
                    w={"10%"}
                    h={"auto"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    position={"absolute"}
                    top={"30%"}
                >
                    <Dots activeIndex={imageIndex} index={1} setImageIndex={setImageIndex} />
                    <Dots activeIndex={imageIndex} index={2} setImageIndex={setImageIndex} />
                    <Dots  activeIndex={imageIndex} index={3} setImageIndex={setImageIndex} />
                </Box>
            </Box>}
            {user.role === "admin" ? <AdminProducts /> : <Products />}
            <Footer />
        </Box>
    );
}

export default Home;