import {Link as ReactRouterLink, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import AuthModal from "./modals/AuthModal.jsx";
import Logo from "./Logo.jsx";

import CartSvg from "../assets/Cart.svg";
import MobileMenu from "./menus/MobileMenu.jsx";


import {
    Flex,
    Heading,
    Link as ChakraLink,
    Spacer,
    HStack,
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import HeaderTag from "./tags/HeaderTag.jsx";
import HeaderMenu from "./menus/HeaderMenu.jsx";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const {isOpen, onToggle} = useDisclosure();
    const {isAuthenticated, isAdmin, isLoading, user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
            if (isAuthenticated) {
                setHidden(true);
                if (isAdmin) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            } else {
                setHidden(false);
            }
        }

    }, [isAuthenticated, isAdmin, isLoading]);


    const linkStyles = {
        textDecoration: "none",
        _focus: {boxShadow: "none"},
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
                <Spacer/>
                <Spacer/>
                {isAuthenticated && (
                    <>
                        <NavLink as={ChakraLink} to="/cart">
                            <Box as="span" {...linkStyles}>
                                <img src={CartSvg} alt={"cart"}/>
                            </Box>
                        </NavLink>
                        <Box>
                            <Box as="span" {...linkStyles}>
                                <HeaderMenu>
                                    <HeaderTag user={user}/>
                                < /HeaderMenu>
                            </Box>
                        </Box>
                    </>
                )}
            </HStack>

            {!hidden && (
                <>
                    <Spacer/>
                    <HStack display={{base: "none", md: "flex"}}>
                        <AuthModal/>
                    </HStack>
                </>)
            }

            {/* Mobile Menu */}
            <MobileMenu />
        </Flex>
    )
        ;
}
