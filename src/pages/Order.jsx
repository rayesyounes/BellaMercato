import {Box, Container,VStack} from "@chakra-ui/react";

export default function CheckoutConfirmAlert() {
    return (
        <Container maxW="container.xxl" minHeight={"lg"} my={4}>
            <VStack spacing={4}>

                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
                    w="100%"
                >


                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </Container>
    )
}