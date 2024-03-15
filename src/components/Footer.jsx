import {Box, Flex, Heading, IconButton, Link, Text} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";
import {useSelector} from "react-redux";

function Footer() {
    const {categories} = useSelector((state) => state.categories.categories);



    return (
        <Box bg={"teal.500"} color={"white"} p={14}>
            <Flex justifyContent="space-between" alignItems="center" my={5}>
                <Box>
                    <Heading
                        as="h1"
                        fontSize="xl"
                        fontWeight="bold"
                        colorScheme="white"
                    >
                        <Logo color={"white"} bg={"teal.500"}/>
                    </Heading>
                </Box>
                <Box>
                    <Flex>
                        <IconButton
                            as={Link}
                            href="https://github.com/rayesyounes"
                            aria-label="Github"
                            icon={<FaGithub/>}
                            fontSize="22px"
                            mr={2}
                            _hover={{color: "teal.500"}}
                        />
                        <IconButton
                            as={Link}
                            href="https://twitter.com/Spoutnikrs"
                            aria-label="Twitter"
                            icon={<FaXTwitter />}
                            fontSize="22px"
                            mr={2}
                            _hover={{color: "teal.500"}}
                        />
                        <IconButton
                            as={Link}
                            href="https://www.linkedin.com/in/rayesyounes"
                            aria-label="Linkedin"
                            icon={<FaLinkedin/>}
                            fontSize="22px"
                            _hover={{color: "teal.500"}}
                        />
                    </Flex>
                </Box>
            </Flex>
            <Flex justify="between" color="white"  flexWrap={{base: 'wrap', sm: 'nowrap'}}
                  alignItems={{base: 'start', sm: 'center'}}>
                <Flex flex={1} justify="start" alignItems="center" gap={2} cursor="pointer" >
                    <Text>©️ Copyright. All rights reserved.</Text>
                </Flex>
                <Text cursor="pointer" >Terms & Conditions</Text>
            </Flex>
        </Box>
    );
}

export default Footer;
