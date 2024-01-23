import { Box, Button, Text, IconButton,Link as ChakraLink,useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import axios from "axios";
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

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 768)
                onClose();
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <Box
            display={"flex"}
            w={"100%"}
            h={"auto"}
            justifyContent={"space-between"}
            alignContent={"center"}
            backgroundColor={"#38b6ff"}
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
    )
}

export default Navbar;