import { Flex, Input, InputGroup, InputRightElement, Spacer, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import HeaderMenu from "../menus/HeaderMenu.jsx";
import HeaderTag from "../tags/HeaderTag.jsx";
import { useSelector } from "react-redux";

export default function AdminNav() {
    const { user } = useSelector((state) => state.auth);

    const handleSearch = (value) => {
        console.log("Searching for:", value);
    };

    return (
        <Flex
            as="nav"
            p={5}
            bg="white"
            alignItems="center"
            borderBottom="1px"
            borderColor="gray.200"
        >

            <Spacer />

            <InputGroup w="70%">
                <Input
                    disabled
                    type="text"
                    placeholder="Search for..."
                    bg="gray.100"
                    borderTop="none"
                    borderLeft="none"
                    borderRight="none"
                    borderBottom="1px"
                    borderColor="gray.200"
                    _focus={{
                        borderColor: "teal.400",
                        boxShadow: "none",
                    }}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <InputRightElement>
                    <IconButton
                        aria-label="Search database"
                        icon={<SearchIcon />} b
                        onClick={() => handleSearch()}
                        colorScheme="teal"
                    />
                </InputRightElement>
            </InputGroup>

            <Spacer />

            {/* Header Menu and Tag */}
            <HeaderMenu>
                <HeaderTag user={user} />
            </HeaderMenu>
        </Flex>
    );
}
