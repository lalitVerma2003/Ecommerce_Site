import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Products from "../Product/Products";
import AdminProducts from "../Product/AdminProducts";
import { useSelector } from "react-redux";
import ImageSection from "./ImageSection";

function Home() {

    const user = useSelector(state => state.user.user);
    const process = import.meta.env;

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
                <>
                    <ImageSection />
                </>
            }
            {user.role === "admin" ? <AdminProducts /> : <Products />}
            <Footer />
        </Box>
    );
}

export default Home;