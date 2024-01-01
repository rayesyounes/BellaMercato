import {
    Flex,
    Heading,
    Box,
    Text,
    Button,
    Spacer,
    HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Navbar() {
    return (
        <Flex as="nav" p={"10px"} bg={"white"} alignItems={"center"}>
            <Heading as="h1">
                <Logo>Logo</Logo>
            </Heading>
            <Spacer />
            <HStack spacing={"20px"}>
                <Link to={"/shop"}>Shop</Link>
                <Link to={"/sales"}>Sales</Link>
                <Link to={"/mission"}>Mission</Link>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/cart"}>Cart</Link>
            </HStack>
            <Spacer />
            <HStack spacing={"20px"}>
                <Box bg={"gray.200"} p={"10px"}>
                    x
                </Box>
                <Text>jhondoe@email.com</Text>
                <Button colorScheme="purple">Logout</Button>
            </HStack>
        </Flex>
    );
}
