import React from 'react'
import { Box, Button, Text, IconButton } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NavbarItem from "./NavbarItem";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DataState } from "../../config/DataProvider";
import axios from "axios";

const NavbarItems = ({fontSize}) => {

    const { user } = DataState();
    const navigate=useNavigate();

    const logOut = async () => {
        localStorage.removeItem("userInfo");
        const { data } = await axios.get("http://localhost:3000/logout");
        console.log("Log out", data);
        navigate("/login");
    }

    return (
        <>
            <ChakraLink as={RouterLink} to={'/home'} >
                {user.role === "admin" ? <NavbarItem itemName="My products" fontSize={fontSize} /> : <NavbarItem itemName="Home" fontSize={fontSize} />}
            </ChakraLink>

            {user.role === "admin" ?
                <ChakraLink as={RouterLink} to={'/products/new'} >
                    <NavbarItem itemName="New Product" fontSize={fontSize} />
                </ChakraLink> :
                <ChakraLink as={RouterLink} to={'/about'} >
                    <NavbarItem itemName="About" fontSize={fontSize} />
                </ChakraLink>}

            {!user ? <ChakraLink as={RouterLink} to={'/login'} >
                Login
            </ChakraLink> :
                <>
                    {user.role === "admin" ? <ChakraLink as={RouterLink} to={'/checkout'} >
                        <NavbarItem itemName="Check out" fontSize={fontSize} />
                    </ChakraLink> : <ChakraLink as={RouterLink} to={'/cart'} >
                        <NavbarItem itemName="Cart" fontSize={fontSize} />
                    </ChakraLink>}
                </>
            }
            <Text onClick={logOut} ><NavbarItem itemName={"Log out"} fontSize={fontSize} /></Text>
        </>
    )
}

export default NavbarItems
