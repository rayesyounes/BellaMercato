import {Button, Input, Heading, Flex, Box, Image} from "@chakra-ui/react";
import {motion} from "framer-motion";
import BannerMiddleBottom from "../../../assets/BannerMiddleBottom.svg";
import BannerTop from "../../../assets/BannerTop.svg";

const Newsletter = () => {

    return (<Box mt={10}>
        <motion.section
            id="contact-us"
            className="max-container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
        >
            <Flex
                justify="center"
                align="center"
                flexDirection={{base: "column", lg: "row"}}
                gap={{base: 5, lg: 40}}
                bg={"teal.50"}
                p={5}
                py={10}
            >
                <Heading
                    as="h3"
                    fontSize="4xl"
                    lineHeight="68px"
                    maxW={{base: "full", lg: "22%"}}
                    fontWeight="bold"
                >
                    Sign Up for
                    <span style={{color: "teal"}}> Updates </span>& Newsletter
                </Heading>
                <Flex
                    maxW={{base: "full", lg: "30%"}}
                    w="full"
                    flexDirection={{base: "column", lg: "row"}}
                    gap={5}
                    p={1}
                    border="2px solid"
                    borderColor="teal"
                    borderRadius="full"
                >
                    <Input
                        bg={"transparent"}
                        type="email"
                        placeholder="subscribe@bellamercato.com"
                        variant="none"
                    />
                    <Button colorScheme="teal" borderRadius={"full"} px={7}>
                        Sign Up
                    </Button>
                </Flex>
            </Flex>
        </motion.section>
    </Box>);
};
export default Newsletter;
