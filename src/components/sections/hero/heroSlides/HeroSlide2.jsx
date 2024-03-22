import {Flex, Text} from "@chakra-ui/react";
import Electronics from "../../../../assets/hero/Electronics.jpg";

export default function HeroSlide1() {
    return (<Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"} p={8}
            bgImage={`url(${Electronics})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            height={"100%"}
            backgroundColor={"rgba(255,255,255,0.6)"}
            backgroundBlendMode={"overlay"}
        >
            <Text color={"white"} height={"60%"} fontWeight={"bold"} fontSize={100}
                  bgImage={`url(${Electronics})`}
                  bgSize="cover"
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  backgroundClip={"text"}
            >
                Experience Seamless Shopping
            </Text>
        </Flex>);
}
