import { Box, HStack, Text, VStack, Button, Image } from '@chakra-ui/react'
import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const OrderItem = ({ order }) => {
    // console.log(order);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const date = (timestamp) => {
        const createdAtDate = new Date(timestamp);

        const year = createdAtDate.getFullYear();
        const month = createdAtDate.getMonth() + 1;
        const date = createdAtDate.getDate();

        return (`${date}/${month}/${year}`);
    }

    return (
        <HStack
            w={"90%"}
            p={3}
            justifyContent={"space-between"}
            border={"2px solid #f4e5e7"}
            onClick={onOpen}
        >
            <VStack p={3} >
                <Text>ORDER ID : 345</Text>
                <Text>ORDER STATUS : {order.delivery_status}</Text>
                <Text>USER NAME : {order.user.name}</Text>
            </VStack>
            <VStack p={3} >
                <Text>ORDER DATE : {() => date(order.createdAt)}</Text>
                <Text>PAYMENT STATUS : {order.payment_status}</Text>
                <Text>BILLING NAME : {order.user.name}</Text>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={3} >
                        <Text fontSize={"1.5rem"} fontFamily={"Work sans"} m={3} >Order By {order.user.name}</Text>

                        <TableContainer>
                            <Table variant='simple'>
                                <Tbody>
                                    <Tr>
                                        <Td>Billing Name</Td>
                                        <Td>{order.user.name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Billing Address</Td>
                                        <Td>{order.shippingInfo.address.city}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Placed on</Td>
                                        <Td>Placed on</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Order status</Td>
                                        <Td>pending</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Payment status</Td>
                                        <Td>{order.payment_status}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Amount</Td>
                                        <Td>{order.totalCost}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Delivered Date</Td>
                                        <Td>Not yet</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>

                        <VStack spacing={6} m={3} >
                            {order.items.map((item, idx) => (
                                <HStack key={idx} p={3} justifyContent={"space-between"} border={"1px solid #f4e5e7 "} shadow='md' >
                                    <Image src={item.product.images[0].url} alt="No image" w={"30%"} />
                                    <VStack>
                                        <Text>{item.product.name}</Text>
                                        <Text>Quantity : {item.quantity}</Text>
                                        <Text>Item Price : ${item.product.price}</Text>
                                    </VStack>
                                    <Text>Product price : ${(item.product.price) * (item.quantity)}</Text>
                                </HStack>
                            ))}
                        </VStack>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    )
}

export default OrderItem
