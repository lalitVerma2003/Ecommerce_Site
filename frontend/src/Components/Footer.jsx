import { Box, Button,Text } from "@chakra-ui/react";
import { FaGithub  } from 'react-icons/fa';

function Footer(){

    return (
        <Box
            display={"flex"}
            w={"100%"}
            h={"auto"}
            backgroundColor={"#38b6ff"}
        >
            <Text fontSize={"2xl"} fontFamily={"inherit"} color={"white"} m={4} mx={20} fontWeight={"semibold"} > &copy; created by Lalit verma</Text>
            <Button m={4} fontSize={"2xl"} fontFamily={"serif"} onClick={()=> {
                window.location.href="https://github.com/lalitVerma2003/Ecommerce_Site";
            }} ><FaGithub style={{margin:"5px"}} />Github</Button>
        </Box>
    );
}

export default Footer;