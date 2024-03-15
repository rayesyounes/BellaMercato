import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import AuthModal from "./modals/AuthModal.jsx";
import Logo from "./Logo.jsx";
import MobileMenu from "./menus/MobileMenu.jsx";
import "../assets/styles/header.css"

import {Box, Flex, Heading, HStack, Link as ChakraLink, Spacer,} from "@chakra-ui/react";
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
            gap={8}
            bg="white"
            justifyContent={"space-between"}
            alignItems="center"
            borderBottom="1px"
            borderColor="gray.200"
        >
            {/* Logo */}
            {isAdmin ? (
                <Heading as="h3" size="lg">
                    ADMIN
                </Heading>
            ) : (
                <Logo>DEMO</Logo>
            )}

            {/*{!admin && (*/}
            {/*    <InputGroup maxW={"600px"}>*/}
            {/*        <Input*/}
            {/*            type="text"*/}
            {/*            placeholder="Search for..."*/}
            {/*            bg="gray.100"*/}
            {/*            borderTop="none"*/}
            {/*            borderLeft="none"*/}
            {/*            borderRight="none"*/}
            {/*            borderBottom="1px"*/}
            {/*            borderColor="gray.200"*/}
            {/*            _focus={{*/}
            {/*                borderColor: "teal.400",*/}
            {/*                boxShadow: "none",*/}
            {/*            }}*/}
            {/*            // onChange={(e) => handleSearch(e.target.value)}*/}
            {/*            isDisabled={true}*/}
            {/*        />*/}
            {/*        <InputRightElement>*/}
            {/*            <IconButton*/}
            {/*                aria-label="Search database"*/}
            {/*                icon={<SearchIcon/>} b*/}
            {/*                // onClick={() => handleSearch()}*/}
            {/*                colorScheme="teal" // Change button color scheme if needed*/}
            {/*                isDisabled={true}*/}
            {/*            />*/}
            {/*        </InputRightElement>*/}
            {/*    </InputGroup>*/}
            {/*)}*/}


            <HStack spacing="20px" display={{base: "none", md: "flex"}}>

                {!admin && (
                    <>
                        <NavLink as={ChakraLink} className="navlink" to="/shop">
                            <Box as="span" {...linkStyles}>
                                Shop
                            </Box>
                        </NavLink>
                        <NavLink
                            as={ChakraLink}
                            className="navlink"
                            to="/sales"
                        >
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
                        <NavLink
                            as={ChakraLink}
                            className="navlink"
                            to="#contact"
                        >
                            <Box as="span" {...linkStyles}>
                                Contact
                            </Box>
                        </NavLink>
                        <Spacer/>
                        <Spacer/>
                        <Spacer/>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        {!isAdmin && <CartDrawer/>}
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
                </>
            )}

            {/* Mobile Menu */}
            <MobileMenu/>
        </Flex>
    );
}
