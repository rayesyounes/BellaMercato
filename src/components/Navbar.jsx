import {
    Flex,
    Heading,
    Link as ChakraLink,
    ButtonGroup,
    Button,
    Spacer,
    HStack,
    Box,
    IconButton,
    Collapse,
    useDisclosure,
    useColorMode,
} from "@chakra-ui/react";

import { Link as ReactRouterLink, NavLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo.jsx";

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();

    const linkStyles = {
        textDecoration: "none",
        _hover: {
            textDecoration: "none",
            color: colorMode === "dark" ? "teal.300" : "teal.500",
            borderBottom: "2px solid",
            paddingBottom: "2px",
        },
        _focus: { boxShadow: "none" }, // Remove default focus outline
    };

    return (
        <Flex
            as="nav"
            p="10px"
            bg="white"
            alignItems="center"
            borderBottom="1px"
            borderColor="gray.200"
        >
            {/* Logo */}
            <Heading
                as="h1"
                fontSize="xl"
                fontWeight="bold"
                colorScheme="teal"
            >
                <ChakraLink as={ReactRouterLink} to="/" {...linkStyles}>
                    <Logo fontSize="1.5rem">RAYSTORE</Logo>
                </ChakraLink>
            </Heading>

            <Spacer />

            {/* Desktop Menu */}
            <HStack spacing="20px" display={{ base: "none", md: "flex" }}>
                <NavLink as={ChakraLink} to="/shop">
                    <Box as="span" {...linkStyles}>
                        Shop
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/sales">
                    <Box as="span" {...linkStyles}>
                        Sales
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="#">
                    <Box as="span" {...linkStyles}>
                        Mission
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="#">
                    <Box as="span" {...linkStyles}>
                        About Us
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="#">
                    <Box as="span" {...linkStyles}>
                        Contact
                    </Box>
                </NavLink>
            </HStack>

            <Spacer />

            {/* Desktop Menu */}
            <HStack display={{ base: "none", md: "flex" }}>
                <NavLink as={ChakraLink} to="/profile">
                    <Box as="span" {...linkStyles}>
                        Profile
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/cart">
                    <Box as="span" {...linkStyles}>
                        Cart
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/dashboard">
                    <Box as="span" {...linkStyles}>
                        Dashboard
                    </Box>
                </NavLink>
            </HStack>
            <Spacer />

            <HStack spacing="20px" display={{ base: "none", md: "flex" }}>
                <ButtonGroup variant="outline" colorScheme="teal">
                    <Button size="sm">Sign Up</Button>
                    <Button size="sm">Log in</Button>
                </ButtonGroup>
            </HStack>

            {/* Hamburger Menu */}
            <Box display={{ md: "none" }} ml={5}>
                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={onToggle}
                    variant="ghost"
                    aria-label="Toggle Navigation"
                />
            </Box>

            {/* Mobile Menu */}
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p="10px"
                    bg="white"
                    position="absolute"
                    top="60px"
                    left="0"
                    right="0"
                    zIndex="999"
                    display={{ md: "none" }}
                >
                    <Flex direction="column" align="center">
                        <NavLink as={ChakraLink} to="/shop" {...linkStyles}>
                            Shop
                        </NavLink>
                        <NavLink as={ChakraLink} to="/sales" {...linkStyles}>
                            Sales
                        </NavLink>
                        <NavLink as={ChakraLink} to="#" {...linkStyles}>
                            Mission
                        </NavLink>
                        <NavLink as={ChakraLink} to="#" {...linkStyles}>
                            About Us
                        </NavLink>
                        <NavLink as={ChakraLink} to="#" {...linkStyles}>
                            Contact
                        </NavLink>
                        <NavLink as={ChakraLink} to="/profile" {...linkStyles}>
                            Profile
                        </NavLink>
                        <NavLink as={ChakraLink} to="/cart" {...linkStyles}>
                            Cart
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="/dashboard"
                            {...linkStyles}
                        >
                            Dashboard
                        </NavLink>
                    </Flex>
                </Box>
            </Collapse>
        </Flex>
    );
}
