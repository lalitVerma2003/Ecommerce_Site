import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Error() {

    const navigate=useNavigate();
    return (
        <Box
            w={"100%"}
            h={"100vh"}
            backgroundImage={"../images/ErrorImage.jpg"}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}
        >
            <Button onClick={()=> navigate(-1)} >
                Go Back
            </Button>
        </Box>
    );
}

export default Error;