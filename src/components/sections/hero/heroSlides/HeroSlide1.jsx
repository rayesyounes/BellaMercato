import {Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import Fashion from "../../../../assets/hero/Fashion.jpg";

export default function HeroSlide1() {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"} p={8}
            bgImage={`url(${Fashion})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            height={"100%"}>


            <Text color={"white"} fontWeight={"bold"} fontSize={66}>
                Explore a World of Products,<br/>Crafted for You
            </Text>

            {/*<Flex alignItems="center" gap={10} justifyContent="space-between">*/}
            {/*    <Box bg={"white"} height={"100%"} width={"100%"}>*/}
            {/*        <Text fontSize="sm" textTransform="uppercase" color="gray.600">*/}
            {/*            Our Summer Collection*/}
            {/*        </Text>*/}
            {/*        <Text fontSize="6xl" fontWeight="bold" color="gray.800">*/}
            {/*            New Collection*/}
            {/*        </Text>*/}
            {/*        <Text fontSize="6xl" fontWeight="bold" color="purple.800">*/}
            {/*            Converse*/}
            {/*        </Text>*/}
            {/*        <Text maxW="md" color="gray.700">*/}
            {/*            Discover stylish Converse arrivals, quality comfort, and innovation for your active life.*/}
            {/*        </Text>*/}
            {/*        <Button bg="purple.600" color="white" mt={4}>*/}
            {/*            Shop now*/}
            {/*        </Button>*/}
            {/*        <Flex mt={4} spaceX={10}>*/}
            {/*            <Box textAlign="center">*/}
            {/*                <Text fontSize="2xl" fontWeight="semibold">*/}
            {/*                    1k+*/}
            {/*                </Text>*/}
            {/*                <Text color="gray.600">Brands</Text>*/}
            {/*            </Box>*/}
            {/*            <Box textAlign="center">*/}
            {/*                <Text fontSize="2xl" fontWeight="semibold">*/}
            {/*                    500+*/}
            {/*                </Text>*/}
            {/*                <Text color="gray.600">Shops</Text>*/}
            {/*            </Box>*/}
            {/*            <Box textAlign="center">*/}
            {/*                <Text fontSize="2xl" fontWeight="semibold">*/}
            {/*                    250k+*/}
            {/*                </Text>*/}
            {/*                <Text color="gray.600">Customers</Text>*/}
            {/*            </Box>*/}
            {/*        </Flex>*/}
            {/*    </Box>*/}


            {/*    <Box bg={"white"} width={"100%"}>*/}
            {/*        <Image*/}
            {/*            src="https://via.placeholder.com/400"*/}
            {/*            alt="Main product"*/}
            {/*            objectFit="cover"*/}
            {/*            borderRadius="md"*/}
            {/*        />*/}
            {/*        <Flex mt={4} justifyContent="space-between">*/}
            {/*            <Image*/}
            {/*                src="https://via.placeholder.com/200"*/}
            {/*                alt="Product variant"*/}
            {/*                objectFit="cover"*/}
            {/*                borderRadius="md"*/}
            {/*                border="1px solid"*/}
            {/*                borderColor="gray.300"*/}
            {/*            />*/}
            {/*            <Image*/}
            {/*                src="https://via.placeholder.com/200"*/}
            {/*                alt="Product variant"*/}
            {/*                objectFit="cover"*/}
            {/*                borderRadius="md"*/}
            {/*                border="1px solid"*/}
            {/*                borderColor="gray.300"*/}
            {/*            />*/}
            {/*            <Image*/}
            {/*                src="https://via.placeholder.com/200"*/}
            {/*                alt="Product variant"*/}
            {/*                objectFit="cover"*/}
            {/*                borderRadius="md"*/}
            {/*                border="1px solid"*/}
            {/*                borderColor="gray.300"*/}
            {/*            />*/}
            {/*        </Flex>*/}
            {/*    </Box>*/}
            {/*</Flex>*/}
        </Flex>
    );
}