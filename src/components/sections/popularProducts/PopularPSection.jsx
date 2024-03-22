import {Box, Flex, Image, Text} from "@chakra-ui/react";
import PopularPSlider from "./PopularPSlider.jsx";
import BannerMiddleTop from "../../../assets/BannerMiddleTop.svg";
import BannerMiddleBottom from "../../../assets/BannerMiddleBottom.svg";

const PopularPSection = () => {
    return (
        <Box position={"relative"}>
            <Flex
                bg="teal.400"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="relative"
                pt={"10vh"}
            >

                <Text
                    textAlign="center"
                    fontSize={80}
                    fontWeight="semibold"
                    p={10}
                    color={"teal.50"}
                    textShadow="2px 2px 40px rgba(0, 80, 80, 0.5)"
                >
                    Check out our Collection
                    <br/>
                    of popular Products!
                </Text>
                <PopularPSlider/>
                <Image src={BannerMiddleTop} alt="BanerMiddleTop"/>
            </Flex>
        </Box>
    );
};

export default PopularPSection;
