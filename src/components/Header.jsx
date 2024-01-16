import {
    Flex,
    Heading,
    Link as ChakraLink,
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
import Modal from "./AuthModal.jsx";
import Logo from "./Logo.jsx";

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();

    const linkStyles = {
        textDecoration: "none",
        _focus: { boxShadow: "none" }, // Remove default focus outline
    };

    const menuItemStyles = {
        padding: "8px",
        borderBottom: "1px solid #ddd", // Add a bottom border to separate items
        width: "100%", // Make each item take up the full width
        textAlign: "center", // Center text
        fontSize: "1.2rem", // Adjust font size
        color: "teal.500", // Adjust text color
        textDecoration: "none", // Remove default underline
        _hover: {
            color: "teal.700", // Adjust text color on hover
            bg: "gray.100", // Adjust background color on hover
        },
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
            <Heading as="h1" fontSize="xl" fontWeight="bold" colorScheme="teal">
                <ChakraLink as={ReactRouterLink} to="/" {...linkStyles}>
                    <Logo fontSize="1.5rem">RAYSTORE</Logo>
                </ChakraLink>
            </Heading>

            <Spacer />

            {/* Desktop Menu */}
            <HStack spacing="20px" display={{ base: "none", md: "flex" }}>
                <NavLink as={ChakraLink} className="navlink" to="/shop">
                    <Box as="span" {...linkStyles}>
                        Shop
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} className="navlink" to="/sales">
                    <Box as="span" {...linkStyles}>
                        Sales
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} className="navlink" to="#">
                    <Box as="span" {...linkStyles}>
                        Mission
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} className="navlink" to="#">
                    <Box as="span" {...linkStyles}>
                        About Us
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} className="navlink" to="#contact">
                    <Box as="span" {...linkStyles}>
                        Contact
                    </Box>
                </NavLink>
                <Spacer />
                <NavLink as={ChakraLink} to="/profile">
                    <Box as="span" {...linkStyles}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="30px"
                            height="30px"
                        >
                            <path
                                d="M 64 27 C 51.3 27 41 37.3 41 50 C 41 62.7 51.3 73 64 73 C 76.7 73 87 62.7 87 50 C 87 37.3 76.7 27 64 27 z M 64 33 C 73.4 33 81 40.6 81 50 C 81 59.4 73.4 67 64 67 C 54.6 67 47 59.4 47 50 C 47 40.6 54.6 33 64 33 z M 64 81 C 47.6 81 32.400781 89.899609 24.300781 104.09961 C 23.500781 105.49961 24 107.39922 25.5 108.19922 C 26 108.49922 26.5 108.59961 27 108.59961 C 28 108.59961 29.099609 108.09961 29.599609 107.09961 C 36.599609 94.699609 49.8 87 64 87 C 78.2 87 91.4 94.699609 98.5 107.09961 C 99.3 108.49961 101.09961 108.99922 102.59961 108.19922 C 103.99961 107.39922 104.49922 105.59961 103.69922 104.09961 C 95.599219 89.899609 80.4 81 64 81 z"
                                fill="#000000"
                            />
                        </svg>
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/cart">
                    <Box as="span" {...linkStyles}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            width="25px"
                            height="25px"
                        >
                            <path
                                d="M 9 11 C 7.3 11 6 12.3 6 14 C 6 15.7 7.3 17 9 17 L 16 17 L 16 91 C 16 96.5 20.5 101 26 101 L 76 101 C 77.7 101 79 99.7 79 98 C 79 96.3 77.7 95 76 95 L 26 95 C 23.8 95 22 93.2 22 91 L 22 27 L 109.30078 27 C 110.60078 27 111.8 27.599219 112.5 28.699219 C 113.3 29.799219 113.5 31.100781 113 32.300781 L 99.300781 73.5 C 97.800781 78 93.700391 81 88.900391 81 L 33 81 C 31.3 81 30 82.3 30 84 C 30 85.7 31.3 87 33 87 L 88.900391 87 C 96.200391 87 102.7 82.300391 105 75.400391 L 118.69922 34.199219 C 119.69922 31.099219 119.20078 27.799219 117.30078 25.199219 C 115.40078 22.599219 112.39922 21 109.19922 21 L 22 21 L 22 14 C 22 12.3 20.7 11 19 11 L 9 11 z M 26 107 C 20.5 107 16 111.5 16 117 C 16 122.5 20.5 127 26 127 C 31.5 127 36 122.5 36 117 C 36 111.5 31.5 107 26 107 z M 76 107 C 70.5 107 66 111.5 66 117 C 66 122.5 70.5 127 76 127 C 81.5 127 86 122.5 86 117 C 86 111.5 81.5 107 76 107 z M 26 113 C 28.2 113 30 114.8 30 117 C 30 119.2 28.2 121 26 121 C 23.8 121 22 119.2 22 117 C 22 114.8 23.8 113 26 113 z M 76 113 C 78.2 113 80 114.8 80 117 C 80 119.2 78.2 121 76 121 C 73.8 121 72 119.2 72 117 C 72 114.8 73.8 113 76 113 z"
                                fill="#000000"
                            />
                        </svg>
                    </Box>
                </NavLink>
            </HStack>

            <Spacer />

            <HStack display={{ base: "none", md: "flex" }}>
                <Modal />
            </HStack>

            <Box display={{ md: "none" }} ml={5}>
                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={onToggle}
                    variant="ghost"
                    aria-label="Toggle Navigation"
                />
            </Box>

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
                        <NavLink
                            as={ChakraLink}
                            to="/shop"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Shop
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="/sales"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Sales
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="#"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Mission
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="#"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="#"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="/profile"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="/cart"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Cart
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            to="/dashboard"
                            {...linkStyles}
                            style={menuItemStyles}
                        >
                            Dashboard
                        </NavLink>
                    </Flex>
                </Box>
            </Collapse>
        </Flex>
    );
}
