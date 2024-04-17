import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";

const Billings = () => {
    //userGlobal State
    const userInfo = useSelector((state) => state.userState.userInfo);
    const navigate = useNavigate();
    const [bills, setBills] = useState([]);

    const getBillings = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/order/getallorders`
            );
            console.log(response);
            if (response.data.status === false)
                throw new Error(response.data.message);
            setBills(response.data.message);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (!userInfo) navigate("/");
        else getBillings();
    }, []);

    return (
        <>
            <Navbar />
            <Container maxW={{ base: "container.sm", md: "container.lg" }} mt="8">
                <Heading as="h1" size="lg" mb="4">
                    Billings
                </Heading>
                <Box overflowX="auto">
                    <Table variant="striped" colorScheme="teal">
                        <Thead>
                            <Tr>
                                <Th>Transaction Code</Th>
                                <Th>Payment Method</Th>
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th>Products</Th>
                                <Th>Created At</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bills.map((bill) => (
                                <Tr key={bill._id}>
                                    <Td>{bill.transaction_code}</Td>
                                    <Td>{bill.payment_method}</Td>
                                    <Td>${bill.amount}</Td>
                                    <Td>{bill.status}</Td>
                                    <Td>
                                        <Box>
                                            {bill.products.map((product) => (
                                                <Box key={product._id}>
                                                    {product.quantity} x {product.product}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Td>
                                    <Td>{new Date(bill.createdAt).toLocaleString()}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Container>
        </>
    );
};

export default Billings;
