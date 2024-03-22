import {
    Badge,
    Box,
    Button,
    ButtonGroup, Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Icon,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";


export default function ProductSlide({product}) {
    const {
        id,
        name,
        rating,
        images,
    } = product;

    return (
        <Box as={Link}
             to={`/product/${id}`}>

            <Card boxShadow="md" borderRadius="lg">
                <CardBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    position={"relative"}
                >
                    <Image
                        src={`/${images[0]}`}
                        _hover={{
                            transform: "scale(1.08)", transition: "all 0.4s ease-in-out",
                        }}
                        // onMouseEnter={handelImageChange(product.id)}
                        alt={`${name} - Product image`}
                        borderRadius="lg"
                        boxSize="220px"
                        objectFit="cover"
                        transition="all 0.2s ease-in-out"
                    />
                    <Flex gap={1} position={"absolute"} right={4} top={4}>
                        <Badge colorScheme="teal" size={"sm"} px={2} variant={"outline"} borderRadius={"xl"}
                               fontSize={10} pt={1}>
                            <Flex alignItems={"center"}>
                                <Icon as={StarIcon} mb={1.5} mr={1} w={2.5} h={2.5}/>
                                <Text fontSize='sm' fontWeight='bold'>{rating}</Text>
                            </Flex>
                        </Badge>
                    </Flex>
                </CardBody>
            </Card>
        </Box>

    );
}
