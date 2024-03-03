import React, {useState, useEffect} from "react";
import {Flex, Input, InputGroup, InputLeftElement, Box, HStack, useRadioGroup, useRadio} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import AddModal from "../modals/AddModal.jsx";
import {useSelector} from "react-redux";

function RadioCard({children, handelClick, ...props}) {
    const {getInputProps, getRadioProps} = useRadio(props);
    const input = getInputProps();
    const checkbox = getRadioProps();

    return (<Box as="label">
        <input {...input} />
        <Box
            {...checkbox}
            cursor="pointer"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg={"white"}
            _checked={{
                bg: renderColor(children), color: "white",
            }}
            px={5}
            onClick={handelClick}
        >
            {children}
        </Box>
    </Box>);
}

function renderColor(status) {
    switch (status) {
        case "processing":
            return "orange.400";
        case "delivered":
            return "green.400";
        case "cancelled":
            return "red.400";
        case "confirmed":
            return "blue.400";
        case "shipped":
            return "purple.400";
        default:
            return "gray.400";
    }
}

function FiltersPanel({setFilteredOrders}) {
    const {currentPage} = useSelector((state) => state.page);
    const {orders} = useSelector((state) => state.orders);
    const statusOptions = ["All", "processing", "delivered", "cancelled", "confirmed", "shipped"];
    const [status, setStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (currentPage === "orders" || currentPage === "history") {
            let filtered = orders.filter((order) => order.status === status || status === "All");
            if (searchTerm) {
                filtered = filtered.filter((order) => order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            setFilteredOrders(filtered);
        }
    }, [status, searchTerm, orders]);

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "status", defaultValue: "All", onChange: setStatus,
    });

    const group = getRootProps();


    return (<Flex
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
        {currentPage === "history" || currentPage === "orders" && (<>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300"/>}/>
                <Input
                    type="tel"
                    placeholder="Search by tracking number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>
            <HStack justify="center" alignItems="center" height={"2.5rem"} borderRadius="xl" bg={"gray.100"}
                    px={3} {...group}>
                {statusOptions.map((status) => {
                    const radio = getRadioProps({value: status});
                    return (<RadioCard key={status} {...radio} handelClick={() => setStatus(status)}>
                        {status}
                    </RadioCard>);
                })}
            </HStack>
        </>)}
        {(currentPage !== "orders" && currentPage !== "history") && <AddModal/>}
    </Flex>);
}

export default FiltersPanel;
