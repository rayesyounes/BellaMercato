import {Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import Unlock from "../../../../assets/hero/Unlock.jpg";

export default function HeroSlide1() {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"} p={8}
            bgImage={`url(${Unlock})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            height={"100%"}
            backgroundColor={"rgba(255,255,255,0.6)"}
            backgroundBlendMode={"overlay"}
        >
            <Text color={"white"} height={"60%"} fontWeight={"bold"} fontSize={96}
                  bgImage={`url(${Unlock})`}
                  bgSize="cover"
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  backgroundClip={"text"}
            >
                Unlock Your Shopping Potential
            </Text>
        </Flex>
    );
}