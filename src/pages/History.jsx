import {Badge, Box, Container, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import setCurrentPage from "../features/page/PageAction.js";
import {useEffect} from "react";
import {getOrdersAsync} from "../features/orders/ordersAction.js";
import FiltersPanel from "../components/panels/FiltersPanel.jsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

export default function History() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {orders} = useSelector((state) => state.orders);
    const MotionBox = motion(Box);

    useEffect(() => {
        dispatch(setCurrentPage("history"));
        dispatch(getOrdersAsync(user.id));
    }, [dispatch]);

    return (<Container maxW="container.xxl" minHeight={"lg"} my={4}>
        <MotionBox
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9}}
        >
            <VStack spacing={4}>
                <FiltersPanel/>

                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
                    w="100%"
                >
                    <Text
                        bg="White"
                        color="teal"
                        fontSize={20}
                        fontWeight="bold"
                        p={4}
                    >
                        My Orders
                    </Text>

                    <SimpleGrid columns={[1, 2, 3, 4]} gap={4} p={4}>
                        {orders.map((order, index) => (<Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            bg="white"
                            p={4}
                            as={Link}
                            to={`/order/${order.id}`}
                        >
                            <Text fontSize={20}>
                                <strong>Order Number {order.id}</strong>
                            </Text>
                            <Text>
                                <strong>Order Status:</strong>{" "}
                                <Badge
                                    variant={"solid"}
                                    borderRadius={"full"}
                                    px={2}
                                    colorScheme={order.status === "processing" ? "orange" : order.status === "confirmed" ? "blue" : order.status === "cancelled" ? "red" : order.status === "delivered" ? "green" : "gray"}
                                >
                                    {order.status}
                                </Badge>
                            </Text>
                        </Box>))}
                    </SimpleGrid>


                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </MotionBox>
    </Container>)
}