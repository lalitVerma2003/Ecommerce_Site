import React from 'react'
import { useState } from 'react';
import { HStack, VStack, FormControl, FormLabel, Textarea, Text, Select, Button, useToast, Box } from '@chakra-ui/react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import axios from 'axios';

const Review = ({ product, setFetch }) => {

    const [show, setShow] = useState(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const toast = useToast();
    // console.log(product);

    const handleReview = async () => {
        try {
            const { data } = await axios.post(`http://localhost:3000/products/${product._id}/reviews`, {
                rating: rating,
                body: comment
            });
            console.log(data);
            toast({
                title: 'Review created',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setRating(1);
            setComment("");
            setFetch((f) => !f);
        }
        catch (err) {
            toast({
                title: 'Error while review created',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Box
                display={"flex"}
                flexDir={{ base: "column", lg: "row" }}
                w={{ base: "100%", lg: "80%" }}
                h={"auto"}
                my={5}
                p={5}
                justifyContent={"space-evenly"}
                alignItems={{base:"center",lg:"flex-start"}}
                // border={"2px solid red"}
            >
                <VStack
                    w={{base:"90%",sm:"70%",md:"50%",lg:"30%"}}
                    mt={10}
                >
                    <Button fontSize={"2xl"} fontFamily={"sans-serif"} m={2} onClick={() => setShow(true)} colorScheme='cyan' variant={!show? 'outline' : 'solid'} >Write your review</Button>
                    <Button fontSize={"2xl"} fontFamily={"sans-serif"} m={2} onClick={() => setShow(false)} colorScheme='cyan' variant={show? 'outline' : 'solid'} >All reviews</Button>
                </VStack>
                <VStack
                    w={{base:"90%",sm:"80%",md:"70%",lg:"50%"}}
                >
                    {show ? (<VStack
                        w={"100%"}
                    >
                        <FormControl>
                            <FormLabel >Rating</FormLabel>
                            <Select placeholder='Select option' onChange={(e) => setRating(e.target.value)} value={rating}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel >Comment</FormLabel>
                            <Textarea placeholder='Write something...' size='md'
                                resize={"none"} value={comment} onChange={(e) => setComment(e.target.value)} />
                        </FormControl>
                        <Button m={2} onClick={handleReview} >Submit</Button>
                    </VStack>) :
                        (<VStack
                            w={"100%"}
                            p={2}
                        >
                            {product.reviews.length===0?(
                                <Text fontSize={"3xl"} fontFamily={"sans-serif"} m={5} >Yet no reviews for this product!!</Text>
                            ):product.reviews.toReversed().map((rev, id) =>
                                <VStack key={id} w={"100%"} alignItems={"flex-start"} border={"2px solid #f4e5e7"} borderRadius={10} p={3} >
                                    <Text fontSize={"1xl"} fontFamily={"sans-serif"} >~{rev.owner ? `${rev.owner.name}` : "Unknown"}</Text>
                                    <Text fontSize={"1xl"} fontFamily={"sans-serif"} >{rev.body}</Text>
                                    <HStack>
                                        {Array.from({ length: rev.rating }, (_, index) => (
                                            <IoIosStar key={index} color="#FFD700" size={20} />
                                        ))}
                                        {Array.from({ length: 5 - rev.rating }, (_, index) => (
                                            <IoIosStarOutline key={index} color="#D3D3D3" size={20} />
                                        ))}
                                    </HStack>
                                </VStack>
                            )}
                        </VStack>)
                    }
                </VStack>
            </Box>
        </>
    )
}

export default Review
