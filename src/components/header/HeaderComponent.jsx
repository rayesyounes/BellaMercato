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
import Logo from "../logo/LogoComponent.jsx";

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();

    const linkStyles = {
        textDecoration: "none",
        _hover: {
            textDecoration: "none",
            color: colorMode === "dark" ? "teal.300" : "teal.500",
            borderBottom: "3px solid",
            paddingBottom: "0.5rem",
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
            <Heading as="h1" fontSize="xl" fontWeight="bold" colorScheme="teal">
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            width="25px"
                            height="25px"
                        >
                            <path
                                d="M 25 2.0078125 C 12.309296 2.0078125 2.0000002 12.317108 2 25.007812 C 2 37.698518 12.309295 48.007812 25 48.007812 C 37.690705 48.007812 48 37.698518 48 25.007812 C 48 12.317108 37.690704 2.0078125 25 2.0078125 z M 25 4.0078125 C 36.609824 4.0078125 46 13.397988 46 25.007812 C 46 30.740509 43.703999 35.925856 39.988281 39.712891 C 38.158498 38.369571 35.928049 37.69558 34.039062 37.023438 C 32.975192 36.644889 32.018651 36.269758 31.320312 35.851562 C 30.651504 35.451051 30.280089 35.039466 30.083984 34.566406 C 29.992134 33.419545 30.010738 32.496253 30.017578 31.40625 C 30.13873 31.285594 30.294155 31.200823 30.417969 31.054688 C 30.709957 30.710058 31.007253 30.29128 31.291016 29.820312 C 31.777604 29.012711 32.131673 28.024913 32.330078 27.023438 C 32.63305 26.869 32.956699 26.835578 33.203125 26.521484 C 33.658098 25.941577 33.965233 25.125482 34.101562 23.988281 C 34.222454 22.984232 33.898957 22.29366 33.482422 21.763672 C 33.930529 20.298851 34.48532 17.969341 34.296875 15.558594 C 34.193203 14.232288 33.859467 12.897267 33.056641 11.787109 C 32.290173 10.727229 31.045786 9.9653642 29.453125 9.6894531 C 28.441568 8.5409775 26.834704 8 24.914062 8 L 24.904297 8 L 24.896484 8 C 20.593741 8.078993 17.817552 9.8598398 16.628906 12.576172 C 15.498615 15.159149 15.741603 18.37477 16.552734 21.722656 C 16.116708 22.25268 15.775146 22.95643 15.898438 23.988281 C 16.035282 25.125098 16.34224 25.94153 16.796875 26.521484 C 17.043118 26.835604 17.366808 26.868911 17.669922 27.023438 C 17.868296 28.024134 18.222437 29.01059 18.708984 29.818359 C 18.992747 30.289465 19.289737 30.707821 19.582031 31.052734 C 19.705876 31.198874 19.861128 31.285522 19.982422 31.40625 C 19.988922 32.49568 20.007396 33.418614 19.916016 34.566406 C 19.720294 35.037723 19.34937 35.449526 18.681641 35.851562 C 17.984409 36.271364 17.029015 36.648577 15.966797 37.029297 C 14.079805 37.705631 11.85061 38.384459 10.015625 39.716797 C 6.2976298 35.929423 4 30.742497 4 25.007812 C 4.0000002 13.397989 13.390176 4.0078125 25 4.0078125 z M 24.921875 10.001953 C 26.766001 10.003853 27.92628 10.549863 28.244141 11.107422 L 28.488281 11.535156 L 28.974609 11.601562 C 30.230788 11.776108 30.932655 12.263579 31.435547 12.958984 C 31.938439 13.654389 32.217535 14.624895 32.302734 15.714844 C 32.473134 17.894741 31.849129 20.468905 31.453125 21.660156 L 31.201172 22.416016 L 31.882812 22.830078 C 31.813472 22.787858 32.203297 23.018609 32.115234 23.75 C 32.008564 24.639799 31.781184 25.093017 31.628906 25.287109 C 31.476629 25.481202 31.411442 25.45641 31.427734 25.455078 L 30.603516 25.523438 L 30.515625 26.345703 C 30.440195 27.052169 30.04285 28.015793 29.578125 28.787109 C 29.345762 29.172767 29.098543 29.516317 28.890625 29.761719 C 28.682707 30.00712 28.461282 30.159117 28.544922 30.115234 L 28.009766 30.394531 L 28.009766 31 C 28.009766 32.324321 27.955813 33.407291 28.095703 34.949219 L 28.107422 35.082031 L 28.154297 35.207031 C 28.547829 36.266071 29.369275 37.013258 30.292969 37.566406 C 31.216662 38.119555 32.276387 38.519377 33.369141 38.908203 C 35.170096 39.549023 37.047465 40.179657 38.478516 41.111328 C 34.832228 44.16545 30.135566 46.007812 25 46.007812 C 19.866422 46.007812 15.171083 44.167232 11.525391 41.115234 C 12.964568 40.188909 14.844735 39.556492 16.642578 38.912109 C 17.73461 38.520704 18.79156 38.119183 19.712891 37.564453 C 20.634221 37.009723 21.452728 36.262662 21.845703 35.207031 L 21.892578 35.082031 L 21.904297 34.949219 C 22.043042 33.408482 21.990234 32.325309 21.990234 31 L 21.990234 30.394531 L 21.455078 30.113281 C 21.538828 30.157091 21.317362 30.005196 21.109375 29.759766 C 20.901388 29.514336 20.654237 29.172879 20.421875 28.787109 C 19.957151 28.015571 19.559775 27.05118 19.484375 26.345703 L 19.396484 25.523438 L 18.572266 25.455078 C 18.587716 25.456378 18.523206 25.481158 18.371094 25.287109 C 18.218979 25.093064 17.991921 24.640183 17.884766 23.75 C 17.797356 23.01846 18.191557 22.784891 18.117188 22.830078 L 18.751953 22.445312 L 18.566406 21.724609 C 17.705952 18.412902 17.575833 15.399621 18.460938 13.376953 C 19.345167 11.356284 21.116417 10.074289 24.921875 10.001953 z"
                                fill="#000000"
                            />
                        </svg>
                    </Box>
                </NavLink>
                <NavLink as={ChakraLink} to="/cart">
                    <Box as="span" {...linkStyles}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            width="25px"
                            height="25px"
                        >
                            <path
                                d="M 25 1 C 19.464844 1 15 5.464844 15 11 L 15 13 L 7.09375 13 L 7 13.875 L 3 48.875 L 2.875 50 L 47.125 50 L 47 48.875 L 43 13.875 L 42.90625 13 L 35 13 L 35 11 C 35 5.464844 30.535156 1 25 1 Z M 25 3 C 29.464844 3 33 6.535156 33 11 L 33 13 L 17 13 L 17 11 C 17 6.535156 20.535156 3 25 3 Z M 8.90625 15 L 15 15 L 15 17.28125 C 14.402344 17.628906 14 18.261719 14 19 C 14 20.105469 14.894531 21 16 21 C 17.105469 21 18 20.105469 18 19 C 18 18.261719 17.597656 17.628906 17 17.28125 L 17 15 L 33 15 L 33 17.28125 C 32.402344 17.628906 32 18.261719 32 19 C 32 20.105469 32.894531 21 34 21 C 35.105469 21 36 20.105469 36 19 C 36 18.261719 35.597656 17.628906 35 17.28125 L 35 15 L 41.09375 15 L 44.875 48 L 5.125 48 Z"
                                fill="#000000"
                            />
                        </svg>
                    </Box>
                </NavLink>
                {/* <NavLink as={ChakraLink} to="/dashboard">
                    <Box as="span" {...linkStyles}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            width="25px"
                            height="25px"
                        >
                            <path
                                d="M 6 4 C 4.9069372 4 4 4.9069372 4 6 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 24 26 C 25.093063 26 26 25.093063 26 24 L 26 6 C 26 4.9069372 25.093063 4 24 4 L 6 4 z M 6 6 L 24 6 L 24 24 L 6 24 L 6 6 z M 9 8 C 8.448 8 8 8.448 8 9 L 8 13 C 8 13.552 8.448 14 9 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 9 C 14 8.448 13.552 8 13 8 L 9 8 z M 17 8 C 16.448 8 16 8.448 16 9 L 16 13 C 16 13.552 16.448 14 17 14 L 21 14 C 21.552 14 22 13.552 22 13 L 22 9 C 22 8.448 21.552 8 21 8 L 17 8 z M 9 16 C 8.448 16 8 16.448 8 17 L 8 21 C 8 21.552 8.448 22 9 22 L 13 22 C 13.552 22 14 21.552 14 21 L 14 17 C 14 16.448 13.552 16 13 16 L 9 16 z M 17 16 C 16.448 16 16 16.448 16 17 L 16 21 C 16 21.552 16.448 22 17 22 L 21 22 C 21.552 22 22 21.552 22 21 L 22 17 C 22 16.448 21.552 16 21 16 L 17 16 z"
                                fill="#000000"
                            />
                        </svg>
                    </Box>
                </NavLink> */}
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
