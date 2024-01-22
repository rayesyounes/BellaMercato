import { Box, Container, VStack } from "@chakra-ui/react";
import FiltersPanel from "../../components/panels/FiltersPanel";
import DataTable from "../../components/tables/DataTable";

function Products() {
    return (
        <Container p={4} maxW="container.xxl">
            <VStack spacing={4}>
                <FiltersPanel />

                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
                    w="100%"
                >
                    <Box
                        bg="White"
                        color="teal"
                        fontSize={20}
                        fontWeight={"bold"}
                        p={4}
                    >
                        Products
                    </Box>

                    {/* <DataTable /> */}

                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </Container>
    );
}

export default Products;
