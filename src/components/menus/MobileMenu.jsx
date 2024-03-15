import React, {useState} from "react";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Link as ChakraLink,
    Spacer,
} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {NavLink} from "react-router-dom";

const linkStyles = {
    color: "black",
    textDecoration: "none",
};

const menuItemStyles = {
    margin: "10px 0",
};

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Box display={{md: "none"}} ml={5}>
                <IconButton zIndex={30}
                            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                            onClick={onToggle}
                            variant="ghost"
                            aria-label="Toggle Navigation"
                />
            </Box>

            <Drawer placement="top" onClose={() => setIsOpen(false)} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px"><Flex>
                        <ChakraLink as={NavLink} to="/" {...linkStyles}>
                            <Box as="span" onClick={onToggle} fontSize="xl" fontWeight="bold">
                                RAYSTORE
                            </Box>
                        </ChakraLink>
                        <Spacer/>
                        <IconButton zIndex={30}
                                    icon={<CloseIcon/>}
                                    onClick={onToggle}
                                    variant="ghost"
                                    aria-label="Toggle Navigation"
                        />
                    </Flex></DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column" align="center">
                            <NavLink to="/shop" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Shop
                            </NavLink>
                            <NavLink to="/sales" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Sales
                            </NavLink>
                            <NavLink to="#" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Mission
                            </NavLink>
                            <NavLink to="#" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                About Us
                            </NavLink>
                            <NavLink to="#" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Contact
                            </NavLink>
                            <NavLink to="/profile" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Profile
                            </NavLink>
                            <NavLink to="/cart" onClick={onToggle} {...linkStyles} style={menuItemStyles}>
                                Cart
                            </NavLink>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
