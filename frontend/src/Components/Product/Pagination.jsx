import React from 'react'
import { HStack, Button, Box } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const Pagination = ({page,setPage,limit}) => {

    const totalData=useSelector(state=> state.product.totalData);

    const handlePagination = (selectPage) => {
        // if (selectPage >= 1 && selectPage <= Math.ceil(totalData / limit) && selectPage != page)
        setPage(selectPage);
    }

    const paginationButtons = () => {
        return [...Array.from({ length: 7 }, (_, idx) => (
            <Button
                key={idx + 1}
                value={idx + 1 + 1}
                onClick={(e) => handlePagination(e.target.value)}
                borderRadius={"50%"}
                m={1}
                colorScheme='#38b6ff'
                variant={page == (idx + 1 + 1) ? 'outline' : ''}
            >{idx + 1 + 1}</Button>
        ))];
    }

    return (
        <HStack
            w={{ base: "90%", sm: "80%", md: "60%", lg: "60%" }}
            h={"auto"}
            justifyContent={"space-between"}
            m={"auto"}
            my={5}
            border={"2px solid red"}
        >
            <Button onClick={() => handlePagination(page - 1)} isDisabled={page > 1 ? false : true} borderRadius={"50%"} colorScheme='#38b6ff' variant={'outline'} width={"5%"} ><ArrowBackIcon boxSize={5} /></Button>
            {totalData > 0 &&
                <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    h={"auto"}
                >
                    <Button
                        key={1}
                        value={1}
                        onClick={(e) => handlePagination(e.target.value)}
                        borderRadius={"50%"}
                        m={1}
                        colorScheme='#38b6ff'
                        variant={page == 1 ? 'outline' : ''}
                    >1</Button>
                    {/* length=Math.ceil(totalData / limit) */}
                    <>
                        {() => paginationButtons()}
                    </>
                    {Array.from({ length: 7 }, (_, idx) => (
                        <Button
                            key={idx + 1}
                            value={idx + 1 + 1}
                            onClick={(e) => handlePagination(e.target.value)}
                            borderRadius={"50%"}
                            m={1}
                            colorScheme='#38b6ff'
                            variant={page == (idx + 1 + 1) ? 'outline' : ''}
                        >{idx + 1 + 1}</Button>
                    ))}
                    <Button
                        // key={idx}
                        value={9}
                        onClick={(e) => handlePagination(e.target.value)}
                        borderRadius={"50%"}
                        m={1}
                        colorScheme='#38b6ff'
                        variant={page == 9 ? 'outline' : ''}
                    >9</Button>
                </Box>
            }
            <Button onClick={() => handlePagination(page + 1)} isDisabled={page < Math.ceil(totalData / limit) ? false : true} borderRadius={"50%"} colorScheme='#38b6ff' variant={'outline'} ><ArrowForwardIcon boxSize={5} /></Button>
        </HStack>
    )
}

export default Pagination
