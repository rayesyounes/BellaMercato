import {
    Flex,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AddModal from "../modals/AddModal.jsx";
import { useSelector } from "react-redux";

function FiltersPanel() {
    const { currentPage } = useSelector((state) => state.page);

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
                    disabled
                    placeholder="Search..."
                    bg="white"
                    border="none"
                    focusBorderColor="teal.500"
                />
            </InputGroup>
            <Select
                disabled
                placeholder="Filter by..."
                bg="white"
                border="none"
                focusBorderColor="teal.500"
                ml={2}
            >
                <option value="username">Username</option>
                <option value="email">Email</option>
            </Select>
            {currentPage !== "orders" && <AddModal />}
        </Flex>
    );
}

export default FiltersPanel;
