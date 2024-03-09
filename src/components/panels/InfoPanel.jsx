import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    HStack,
    Tag,
    TagLabel,
    Text
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function InfoPanel({ product }) {

    const colors = ["#336699", "#FF6600", "#99CC00", "#FFCC00", "#663399", "#CC3333", "#0099CC", "#FF33CC"];

    return (
        <Flex
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            w="100%"
            p={4}
            gap={4}
            alignItems="center"
            justifyContent="space-between"
        >
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                <BreadcrumbItem>
                    <Link to={"/"}><BreadcrumbLink href="#">Home</BreadcrumbLink></Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link to={"/shop"}><BreadcrumbLink href="#">Shop</BreadcrumbLink></Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <Link to={"/shop"}><BreadcrumbLink href="#">Products</BreadcrumbLink></Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack justify="center" alignItems="center">
                {product.category.map((cat, index) => (
                    <Tag
                        bg={colors[index % colors.length]}
                        key={index}
                        colorScheme="teal"
                        size="lg"
                        px={2}
                        variant="solid"
                        borderRadius="xl"
                        fontSize="md"
                        pt={1}
                        ml={2}
                    >
                        <TagLabel>
                            {cat}
                        </TagLabel>
                    </Tag>
                ))}

                <Tag
                    colorScheme="teal"
                    size="lg"
                    px={2}
                    variant="solid"
                    borderRadius="xl"
                    fontSize="md"
                    pt={1}
                    ml={2}
                >
                    <TagLabel>
                        {product.brand}
                    </TagLabel>
                </Tag>
            </HStack>
        </Flex>
    );
}
