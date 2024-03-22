import {Box, Flex, Grid, Heading, IconButton, Text} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaXTwitter} from "react-icons/fa6";
import "../assets/styles/footer.css"
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Footer() {
    const categories = useSelector((state) => state.categories.categories);

    const linkStyles = {
        textDecoration: "none",
        fontSize: "lg",
        fontWeight: "regular",
        lineHeight: "1.4",
        _focus: {boxShadow: "none"},
    };

    return (
        <Box bg={"teal.500"} color={"white"} p={10}>
            <Flex flexWrap="wrap" justifyContent="space-between" mx={20}>
                <Grid templateColumns={{base: "repeat(3, 1fr)", sm: "repeat(4, 1fr)"}} justifyItems={"center"} gap={10}>
                    <Flex id={"contact"} flexDirection="column" gap={3} alignItems="flex-start" flex={1} mb={5}>
                        <Box>
                            <Heading as="h1" fontSize="xl" fontWeight="bold">
                                <Logo color={"white"} bg={"teal.500"} fontSize={2} translateX={2.5}/>
                            </Heading>
                        </Box>
                        <Box>
                            <Text {...linkStyles}>
                                Elevate your shopping experience with a diverse range of products tailored for your
                                lifestyle and preferences.
                            </Text>
                        </Box>
                        <Box>
                            <Flex gap={2} py={2}>
                                <IconButton
                                    as={Link}
                                    to="https://github.com/rayesyounes"
                                    aria-label="Github"
                                    icon={<FaGithub/>}
                                    fontSize="22px"
                                    mr={2}
                                    _hover={{color: "teal.300"}}
                                />
                                <IconButton
                                    as={Link}
                                    to="https://twitter.com/Spoutnikrs"
                                    aria-label="Twitter"
                                    icon={<FaXTwitter/>}
                                    fontSize="22px"
                                    mr={2}
                                    _hover={{color: "teal.300"}}
                                />
                                <IconButton
                                    as={Link}
                                    to="https://www.linkedin.com/in/rayesyounes"
                                    aria-label="Linkedin"
                                    icon={<FaLinkedin/>}
                                    fontSize="22px"
                                    _hover={{color: "teal.300"}}
                                />
                            </Flex>
                        </Box>
                    </Flex>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h2" size="md" fontWeight="bold">
                            Categories
                        </Heading>
                        {categories.map((category) => (
                            <Text className="footerlink" as={Link} key={category.id} to={category.link}>
                                <Box as="span" {...linkStyles}>
                                    {category.name.split("-")
                                        .join(" ")
                                        .split(" ")
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")}
                                </Box>
                            </Text>
                        ))}
                    </Flex>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h2" size="md" fontWeight="bold">
                            Information
                        </Heading>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                Blog
                            </Box>
                        </Link>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                About
                            </Box>
                        </Link>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                Contact
                            </Box>
                        </Link>
                    </Flex>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h2" size="md" fontWeight="bold">
                            Legal
                        </Heading>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                Privacy Policy
                            </Box>
                        </Link>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                Payment policy
                            </Box>
                        </Link>
                        <Link to="#" className="footerlink">
                            <Box as="span" {...linkStyles}>
                                Terms & Conditions
                            </Box>
                        </Link>
                    </Flex>
                </Grid>
            </Flex>
            <Flex justifyContent="center" alignItems="center" mt={8}>
                <Text>© 2024 BellaMercato. All rights reserved.</Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center" mt={2}>
                <Text>Made with 🤍 by&nbsp;
                    <a href="https://github.com/rayesyounes"   target="_blank" rel="noreferrer">Spoutnikrs</a>
                </Text>
            </Flex>
        </Box>
    );
}

export default Footer;
