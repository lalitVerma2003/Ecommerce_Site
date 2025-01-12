import React, { useState, useEffect } from 'react'
import { Box, Image } from '@chakra-ui/react';
import Dots from './Dots';

const ImageSection = () => {

    const [imageIndex, setImageIndex] = useState(1);

    useEffect(() => {
        const setImage = setTimeout(() => {
            handleNextImage();
        }, 3000);

        return () => {
            clearTimeout(setImage);
        }
    }, [imageIndex]);

    const handleNextImage = () => {
        imageIndex < 3 ? setImageIndex((idx) => idx + 1) : setImageIndex(1);
    }

    return (
        <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"auto"}
            position={"relative"}
        >
            <Image
                w={"100%"}
                h={{ base: "50vh", md: "65vh", lg: "100vh" }}
                objectFit='contain'
                src={`../images/Image${imageIndex}.jpg`}
                alt='No'
                opacity={"0.9"}
            />
            <Box
                w={"10%"}
                h={"auto"}
                display={"flex"}
                justifyContent={"space-between"}
                position={"absolute"}
                top={"90%"}
            >
                <Dots activeIndex={imageIndex} index={1} setImageIndex={setImageIndex} />
                <Dots activeIndex={imageIndex} index={2} setImageIndex={setImageIndex} />
                <Dots activeIndex={imageIndex} index={3} setImageIndex={setImageIndex} />
            </Box>
        </Box>
    )
}

export default ImageSection
