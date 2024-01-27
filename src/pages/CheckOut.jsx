import { Flex, Heading, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/page/PageAction.js";
import { useEffect } from "react";

export default function CheckOut() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("checkout"));
    }, [dispatch]);

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            p="10px"
            mt="100px"
        >
            <Heading as="h1" size="lg" mb="20px">
                Checkout
            </Heading>
            <Text>Checkout page is under construction.</Text>
        </Flex>
    );
}
