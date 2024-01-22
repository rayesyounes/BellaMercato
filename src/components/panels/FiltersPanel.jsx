import {
    Flex,
    Input,
    Select,
    Button,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

function FiltersPanel() {
    return (
        <Flex
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            w="100%"
            p={4}
            alignItems="center"
            justifyContent="space-between"
        >
            <InputGroup flex="1">
                <InputLeftElement pointerEvents="none" color="gray.400">
                    <SearchIcon />
                </InputLeftElement>
                <Input
                    placeholder="Search..."
                    bg="white"
                    border="none"
                    focusBorderColor="teal.500"
                />
            </InputGroup>
            <Select
                placeholder="Filter by..."
                bg="white"
                border="none"
                focusBorderColor="teal.500"
                ml={2}
            >
                <option value="username">Username</option>
                <option value="email">Email</option>
            </Select>
            <Button
                colorScheme="teal"
                size={"sm"}
                _hover={{ bg: "teal.500" }}
            >
                <AddIcon mr={2} />
                Add
            </Button>
        </Flex>
    );
}

export default FiltersPanel;
