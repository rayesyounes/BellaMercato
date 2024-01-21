import {Heading, Text, Container, Box, SimpleGrid} from "@chakra-ui/react";

export default function Dashboard() {


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