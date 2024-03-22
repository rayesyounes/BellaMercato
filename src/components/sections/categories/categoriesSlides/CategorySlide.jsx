import {Flex, VStack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function CategorySlide({category}) {
    const {image, name, color, link, description} = category;

    return (
        <Flex
            as={Link}
            to={link}
            borderRadius={"xl"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            p={8}
            bgImage={image}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            height={"100%"}
            _hover={{
                backgroundColor: `${color}90`,
                transition: "all 0.5s ease"
            }}
            backgroundColor={`${color}20`}
            backgroundBlendMode={"soft-light"}
            transition={"all 0.5s ease-in-out;"}
            cursor={"pointer"}
        >
            <VStack
                transition={"all 0.5s ease-in-out;"}
            >
                <Text
                    transition={"all 0.5s ease-in-out;"}
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={["2xl", "3xl", "4xl", "5xl"]} // Adjust font size for responsiveness
                    textAlign="center" // Center-align the text
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)" // Add a subtle text shadow for better readability
                >
                    {name
                        .split("-")
                        .join(" ")
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </Text>
                <Text
                    transition={"all 0.8s ease-in-out;"}
                    className="category-description"
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={["sm", "md", "lg", "xl"]} // Adjust font size for responsiveness
                    textAlign="center" // Center-align the text
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)" // Add a subtle text shadow for better readability
                >
                    {description}
                </Text>
            </VStack>
        </Flex>
    );
}
