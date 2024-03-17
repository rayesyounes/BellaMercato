import { Flex} from "@chakra-ui/react";
import HeroSlider from "./HeroSlider.jsx";
const HeroSection = () => {
    return (
        <Flex flexDirection={"column"}>
            <HeroSlider/>
        </Flex>
    );
};

export default HeroSection;
