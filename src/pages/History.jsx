import {Badge, Box, Container, Text, VStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import setCurrentPage from "../features/page/PageAction.js";
import {useEffect, useState} from "react";
import {getOrdersAsync} from "../features/orders/ordersAction.js";
import FiltersPanel from "../components/panels/FiltersPanel.jsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

export default function History() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {orders} = useSelector((state) => state.orders);
    const [filteredData, setFilteredData] = useState(orders);
    const MotionBox = motion(Box);

    useEffect(() => {
         window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(setCurrentPage("history"));
        dispatch(getOrdersAsync(user.id));
    }, [dispatch, user.id]);

    return (<Container maxW="container.xxl" minHeight={"lg"} my={4}>
        <VStack spacing={4}>
            <FiltersPanel setFilteredData={setFilteredData}/>

            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                p={4}
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

                <MotionBox
                    initial={{opacity: 0, y: -1}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.9}}
                >
                    {filteredData.length === 0
                        ? <Box p={4} textAlign="center" color="gray.500">No orders found </Box>
                        : <Box px={2}>
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(6, 1fr)"
                                gap={4}
                                p={4}
                                bg="white"
                                borderBottomWidth="1px"
                                borderBottomColor="gray.300"
                            >

                                <Text fontWeight="bold">Tracking Number</Text>
                                <Text fontWeight="bold">Shipping Address</Text>
                                <Text fontWeight="bold">Order Date</Text>
                                <Text fontWeight="bold">Shipping Method</Text>
                                <Text fontWeight="bold">Total</Text>
                                <Text fontWeight="bold">Status</Text>
                            </Box>
                            <Box>
                                {filteredData.map((order, index) => (<Box
                                    as={Link}
                                    to={`/order/${order.id}`}
                                    key={index}
                                    display="grid"
                                    gridTemplateColumns="repeat(6, 1fr)"
                                    gap={4}
                                    p={4}
                                    px={8}

                                    borderBottomWidth="1px"
                                    borderBottomColor="gray.300"
                                    _hover={{
                                        bg: "gray.100", cursor: "pointer", transition: "all 0.2s ease-in-out"
                                    }}
                                >

                                    <Text>{order.tracking_number}</Text>
                                    <Text>{order.shipping_address}</Text>
                                    <Text>
                                        {new Date(order.order_date).toLocaleDateString()}
                                    </Text>
                                    <Text>{order.shipping_method}</Text>
                                    <Text>{order.total}</Text>
                                    <Text>
                                        <Badge
                                            variant="subtle"
                                            borderRadius={5}
                                            colorScheme={order.status === "processing" ? "orange" : order.status === "confirmed" ? "blue" : order.status === "cancelled" ? "red" : order.status === "delivered" ? "green" : order.status === "shipped" ? "purple" : "gray"}
                                        >
                                            {order.status}
                                        </Badge>
                                    </Text>
                                </Box>))}
                            </Box>

                        </Box>
                    }
                </MotionBox>
            </Box>
        </VStack>
    </Container>)
}