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
        </Flex>
    );
}