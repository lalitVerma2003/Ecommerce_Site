import { Box, Button } from "@chakra-ui/react";

function Footer(){
    return (
        <Box
            w={"100%"}
            h={"10vh"}
            border={"2px solid red"}
        >
            created by Lalit verma
            <Button>View code</Button>
        </Box>
    );
}

export default Footer;