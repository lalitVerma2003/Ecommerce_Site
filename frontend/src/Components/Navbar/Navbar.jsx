import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Text, IconButton, Input } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { DataState } from "../../config/DataProvider";
import axios from "axios";
import NavbarItem from "./NavbarItem";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import NavbarItems from "./NavbarItems";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

function Navbar() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = DataState();
    const navigate = useNavigate();
    const logOut = async () => {
        localStorage.removeItem("userInfo");
        const { data } = await axios.get("http://localhost:3000/logout");
        console.log("Log out", data);
        navigate("/login");
    }

    useEffect(()=>{
        const handleResize=()=>{
            const width=window.innerWidth;
            if(width>=768)
                onClose();
        }
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    },[])

    return (
        <Box
            display={"flex"}
            w={"100%"}
            h={"auto"}
            justifyContent={"space-between"}
            alignContent={"center"}
            backgroundColor={"#38b6ff"}
        // border={"2px solid red"}
        >
            <Text fontSize={"4xl"} fontFamily={"monospace"} fontWeight={"bold"} color={"white"} mx={5} >EasyBuyHub</Text>
            <Box
                display={{ base: "block", md: "none" }}
            >
                <IconButton onClick={onOpen} w={"10%"} m={3} p={3} icon={<HamburgerIcon />} />
            </Box>

            <Box
                display={{ base: "none", md: "flex" }}
                width={"90%"}
                height={"60px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={5}
                mx={5}
                // border={"2px solid black"}
                backgroundColor={"#38b6ff"}
            >
                <NavbarItems fontSize={"1xl"} />
            </Box>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={"xs"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody 
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"#38b6ff"}
                        opacity={0.8}
                    >
                        <NavbarItems fontSize={"2xl"} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

export default Navbar;