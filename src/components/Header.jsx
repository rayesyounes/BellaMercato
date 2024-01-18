import {Link as ReactRouterLink, NavLink} from "react-router-dom";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import AuthModal from "./modals/AuthModal.jsx";
import Logo from "./Logo.jsx";

import "../assets/Cart.svg";


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
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const {isOpen, onToggle} = useDisclosure();
    const {isAuthenticated, isAdmin, isLoading, error} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated || isAdmin) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    }, [isAuthenticated, isAdmin, isLoading, error]);

    const linkStyles = {
        textDecoration: "none",
        _focus: {boxShadow: "none"},
    };

    const menuItemStyles = {
        padding: "8px",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
        fontSize: "1.2rem",
        color: "teal.500",
        textDecoration: "none",
        _hover: {
            color: "teal.700",
            bg: "gray.100",
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

            <Spacer/>

            {/* Desktop Menu */}
            <HStack spacing="20px" display={{base: "none", md: "flex"}}>
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
                <Spacer/>
                <NavLink as={ChakraLink} to="/profile">
                    <Box as="span" {...linkStyles}>

                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/cart">
                    <Box as="span" {...linkStyles}>

                    </Box>
                </NavLink>
            </HStack>

            <Spacer/>

            <HStack display={{base: "none", md: "flex"}}>
                {!hidden && <AuthModal />}
            </HStack>

            <Box display={{md: "none"}} ml={5}>
                <IconButton
                    icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
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
                    display={{md: "none"}}
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
