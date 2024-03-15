import {Box, Container, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUsersAsync} from "../../features/users/usersAction.js";
import {getOrdersAsync} from "../../features/orders/ordersAction.js";
import {getProductsAsync} from "../../features/products/productsAction.js";
import {setCurrentPage} from "../../features/page/PageAction";

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentPage("dashboard"));
        dispatch(getUsersAsync());
        dispatch(getOrdersAsync());
        dispatch(getProductsAsync());
    }, [dispatch]);


    return (
        <Container p={4} maxW="container.xxl">
            <SimpleGrid columns={2} spacing={10}>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl" mb={2}>Total Users</Heading>
                    <Text fontSize="4xl">100</Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl" mb={2}>Total Orders</Heading>
                    <Text fontSize="4xl">100</Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl" mb={2}>Total Products</Heading>
                    <Text fontSize="4xl">100</Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl" mb={2}>Total Sales</Heading>
                    <Text fontSize="4xl">100</Text>
                </Box>
            </SimpleGrid>
        </Container>
    )
}