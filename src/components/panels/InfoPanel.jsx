import {Badge, Flex, Text} from "@chakra-ui/react";

import AddModal from "../modals/AddModal.jsx";
import React from "react";

export default function InfoPanel({product}) {
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
          <Text fontSize="lg" color="gray.500">
              <strong>Category :</strong> {product.category.map((cat) => (
              <Badge ml='1' p={2} key={cat} borderRadius={"lg"} variant={"solid"} fontSize='0.8em'
                     colorScheme='teal'>
                  {cat}
              </Badge>))}
          </Text>
          <Text fontSize="lg" color="gray.500">
              <strong>Brand :</strong> <Badge ml='1' borderRadius={"lg"} fontSize='0.8em' colorScheme='teal'>
              {product.brand}
          </Badge>
          </Text>

      </Flex>
  );
}