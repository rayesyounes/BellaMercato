import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {Link} from "react-router-dom";

export default function InfoPanel({ product }) {
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

            <Text fontSize="lg" color="gray.500">
                <strong>Category :</strong>{" "}
                {product.category.map((cat, index) => (
                    <Badge key={index} ml={index > 0 ? 2 : 0} p={2} borderRadius="lg" variant="solid" fontSize="0.8em" colorScheme="teal">
                        {cat}
                    </Badge>
                ))}
            </Text>
            <Text fontSize="lg" color="gray.500">
                <strong>Brand :</strong>{" "}
                <Badge ml={2} p={2} borderRadius="lg" fontSize="0.8em" colorScheme="teal">
                    {product.brand}
                </Badge>
            </Text>
        </Flex>
    );
}
