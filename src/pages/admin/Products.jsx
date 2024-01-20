import {Box, Container, Heading, SimpleGrid, Text} from "@chakra-ui/react";

function Products() {
    return (
        <Container p={4} maxW="container.xl">
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
    );
}

export default Products;
