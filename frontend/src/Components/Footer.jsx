import { Button,Text, HStack } from "@chakra-ui/react";
import { FaGithub  } from 'react-icons/fa';

function Footer(){

    return (
        <HStack
            justifyContent={"space-evenly"}
            w={"100%"}
            h={"auto"}
            p={{base:"2",md:"3"}}
            backgroundColor={"#38b6ff"}
        >
            <Text fontSize={{sm:"3xl",md:"2xl"}} fontFamily={"inherit"} color={"white"} fontWeight={"semibold"}> &copy; created by Lalit verma</Text>
            <Button fontSize={{sm:"3xl",md:"2xl"}} fontFamily={"serif"} onClick={()=> {
                window.location.href="https://github.com/lalitVerma2003/Ecommerce_Site";
            }} ><FaGithub style={{margin:"5px"}} />Github</Button>
        </HStack>
    );
}

export default Footer;