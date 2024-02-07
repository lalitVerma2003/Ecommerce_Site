import React from 'react'
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
        navigate("/login");
    }

    return (
        <>
            <ChakraLink as={RouterLink} to={'/home'} >
                {user?.role === "admin" ? <NavbarItem itemName="My products" fontSize={fontSize} /> : <NavbarItem itemName="Home" fontSize={fontSize} />}
            </ChakraLink>

            {user?.role === "admin" ?
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
                    {user?.role === "admin" ? <ChakraLink as={RouterLink} to={'/myorders'} >
                        <NavbarItem itemName="My Orders" fontSize={fontSize} />
                    </ChakraLink> : <ChakraLink as={RouterLink} to={'/cart'} >
                        <NavbarItem itemName="Cart" fontSize={fontSize} />
                    </ChakraLink>}
                </>
            }
            <ChakraLink onClick={logOut} ><NavbarItem itemName={"Log out"} fontSize={fontSize} /></ChakraLink>
        </>
    )
}

export default NavbarItems
