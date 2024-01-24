import {Link as ReactRouterLink, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import AuthModal from "./modals/AuthModal.jsx";
import Logo from "./Logo.jsx";

import CartSvg from "../assets/Cart.svg";
import MobileMenu from "./menus/MobileMenu.jsx";
import "../assets/styles/header.css"

import {
    Flex,
    Heading,
    Link as ChakraLink,
    Spacer,
    HStack,
    Box,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import HeaderTag from "./tags/HeaderTag.jsx";
import HeaderMenu from "./menus/HeaderMenu.jsx";
import CartDrawer from "./drawers/CartDrawer.jsx";

export default function Header() {
    // const {isOpen, onToggle} = useDisclosure();
    const [hidden, setHidden] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const {isAuthenticated, isAdmin, isLoading, user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        if (isAuthenticated) {
            setHidden(false);
        } else {
            setHidden(true);
        }
        if (isAdmin) {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [isAuthenticated, isAdmin, isLoading]);


    const linkStyles = {
        textDecoration: "none",
        fontSize: "xl",
        fontWeight: "regular",
        _focus: {boxShadow: "none"},
    };

    return (
        <Flex
            as="nav"
            p={4}
            bg="white"
            alignItems="center"
            borderBottom="1px"
            borderColor="gray.200"
        >
            {/* Logo */}
            {isAdmin ? <Heading as='h3' size='lg'>ADMIN</Heading>
                : <Logo>DEMO</Logo> }

            <Spacer/>

            {/* Desktop Menu */}
            <HStack spacing="20px" display={{base: "none", md: "flex"}}>
                {!admin && (<>
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
                </>)}
                {isAuthenticated && (
                    <>
                        {!isAdmin && (
                            <CartDrawer/>
                        )}
                        <HeaderMenu>
                            <HeaderTag user={user}/>
                        </HeaderMenu>
                    </>
                )}
            </HStack>

            {hidden && (
                <>
                    <Spacer/>
                    <HStack display={{base: "none", md: "flex"}}>
                        <AuthModal/>
                    </HStack>
                </>)
            }

            {/* Mobile Menu */}
            <MobileMenu/>
        </Flex>
    );
}
