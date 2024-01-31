import React, {useEffect} from "react";
import {
    Flex, Input, InputGroup, InputLeftElement, Box, HStack, useRadioGroup, useRadio,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import AddModal from "../modals/AddModal.jsx";
import {useSelector, useDispatch} from "react-redux";
import {filterOrdersByStatus, getOrdersAsync} from "../../features/orders/ordersAction.js";

function RadioCard({children, ...props}) {
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
        default:
            return "gray.400";
    }
}

function FiltersPanel() {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {currentPage} = useSelector((state) => state.page);
    const {orders} = useSelector((state) => state.orders);
    const statusOptions = ["All", "processing", "delivered", "cancelled", "confirmed"];
    const [status, setStatus] = React.useState("All");

    useEffect(() => {
        // if (currentPage === "history") {
        //     dispatch(getOrdersAsync(user.id));
        //     dispatch(filterOrdersByStatus(orders, status));
        // }
        console.log("status", status);
    }, [status]);

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
        {currentPage === "history" && (<>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300"/>}
                />
                <Input type="tel" placeholder="Search"/>
            </InputGroup>
            <HStack
                justify="center"
                alignItems="center"
                height={"2.5rem"}
                borderRadius="xl"
                bg={"gray.100"}
                px={3}

                {...group}>
                {statusOptions.map((status) => {
                    const radio = getRadioProps({value: status});
                    return (<RadioCard key={status} {...radio}>
                        {status}
                    </RadioCard>);
                })}
            </HStack>
        </>)}
        {(currentPage !== "orders" && currentPage !== "history") && <AddModal/>}
    </Flex>);
}

export default FiltersPanel;
