import {
    Flex, Input, Select, InputGroup, InputLeftElement,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import AddModal from "../modals/AddModal.jsx";


function FiltersPanel() {
    return (<Flex
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
                    <SearchIcon/>
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
            <AddModal />
        </Flex>);
}

export default FiltersPanel;
