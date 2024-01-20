import {
    Box,
    Flex,
    Text,
    Link,
    IconButton,
    Heading,
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
    return (
        <Box bg={"teal.500"} color={"white"} p={4}>
            <Flex justifyContent="space-between" alignItems="center" my={5}>
                <Box>
                    <Heading
                        as="h1"
                        fontSize="xl"
                        fontWeight="bold"
                        colorScheme="white"
                    >
                        <Logo fontSize="1.5rem">RAYSTORE</Logo>
                    </Heading>
                </Box>
                <Box>
                    <Flex>
                        <IconButton
                            as={Link}
                            href="https://github.com/rayesyounes"
                            aria-label="Github"
                            icon={<FaGithub />}
                            fontSize="20px"
                            mr={2}
                            _hover={{ color: "teal.500" }}
                        />
                        <IconButton
                            as={Link}
                            href="#"
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            fontSize="20px"
                            mr={2}
                            _hover={{ color: "teal.500" }}
                        />
                        <IconButton
                            as={Link}
                            href="#"
                            aria-label="Linkedin"
                            icon={<FaLinkedin />}
                            fontSize="20px"
                            _hover={{ color: "teal.500" }}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default Footer;
