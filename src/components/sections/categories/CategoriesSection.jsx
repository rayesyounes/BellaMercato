import {Flex,Text} from "@chakra-ui/react";
import CategoriesSlider from "./CategoriesSlider.jsx";

const CategoriesSection = () => {
    return (
        <Flex flexDirection={"column"} >
            <Text
                textAlign={"start"}
                fontSize={95}
                fontWeight={"bold"}
                color={"teal.800"}
                px={10}
            >Discover our categories</Text>
            <CategoriesSlider/>
        </Flex>
    );
};

export default CategoriesSection;
