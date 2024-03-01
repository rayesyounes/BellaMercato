import {
    Box, Container, Badge, Text, Thead, Tr, Th, Tbody, Td, Tfoot, Table, Flex, CardHeader, CardBody, Card
} from "@chakra-ui/react";
import {useSelector, useDispatch} from "react-redux";
import {getOrdersAsync} from "../features/orders/ordersAction.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import setCurrentPage from "../features/page/PageAction.js";
import {motion} from "framer-motion";
export default function CheckoutConfirmAlert() {
    const MotionBox = motion(Box);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {orders} = useSelector((state) => state.orders);
    const {products} = useSelector((state) => state.products);

    const [order, setOrder] = useState({
        id: null,
        notes: null,
        status: null,
        order_date: null,
        total: 0,
        products: [],
        shipping_address: null,
        billing_address: null,
        shipping_method: null,
        payment_method: null,
        payment_status: null,
        shipping_date: null,
        shipping_cost: 0,
        discount: 0,
        tax: 0,

    });

    useEffect(() => {
        dispatch(setCurrentPage("order"));
        dispatch(getOrdersAsync());
        setOrder(orders.find((order) => order.id === id));
    }, [dispatch, id]);

    console.log(order);

    return (<Container maxW="container.xxl" minHeight={"lg"} my={4}>
        <MotionBox
            p={8}
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <Flex
                borderRadius="lg"
                boxShadow="xl"
                bgColor="white"
                flexDirection={{base: "column", md: "row"}}
                alignItems={{base: "center", md: "stretch"}}
                p={{base: 4, md: 8}}
            >
                <Box flex={2} p={{base: 0, md: 4}} textAlign="left">
                    <Flex direction="column" gap={6} w="100%">
                        <Text>
                            <strong>Order Status:</strong>{" "}
                            <Badge
                                colorScheme={order.status === "processing" ? "orange" : order.status === "confirmed" ? "blue" : order.status === "cancelled" ? "red" : order.status === "delivered" ? "green" : "gray"}
                            >
                                {order.status}
                            </Badge>
                        </Text>
                        <Text>
                            <strong>Tracking Number:</strong> {order.tracking_number}
                        </Text>
                        <Text>
                            <strong>Order Date:</strong>{" "}
                            {new Date(order.order_date).toLocaleString()}
                        </Text>
                        <Text>
                            <strong>Delivery Date:</strong>{" "}
                            {new Date(order.delivery_date).toLocaleString()}
                        </Text>
                        <Text>
                            <strong>Shipping Address:</strong> {order.shipping_address}
                        </Text>
                        <Text>
                            <strong>Billing Address:</strong> {order.billing_address}
                        </Text>
                        <Text>
                            <strong>Payment Method:</strong> {order.payment_method}
                        </Text>
                        <Text>
                            <strong>Payment Status:</strong> {order.payment_status}
                        </Text>
                        <Text>
                            <strong>Shipping Date:</strong>{" "}
                            {new Date(order.shipping_date).toLocaleString()}
                        </Text>
                        <Text>
                            <strong>Shipping Cost:</strong> ${order.shipping_cost.toFixed(2)}
                        </Text>
                        <Text>
                            <strong>Tax:</strong> ${order.tax.toFixed(2)}
                        </Text>
                        <Text>
                            <strong>Discount:</strong> ${order.discount.toFixed(2)}
                        </Text>
                        <Text>
                            <strong>Shipping Method:</strong> {order.shipping_method}
                        </Text>
                        <Text>
                            <strong>Notes:</strong> {order.notes}
                        </Text>
                    </Flex>
                </Box>

                <Box flex={1} textAlign="center">
                    <Card maxW="500px" bg="gray.100" border="2px solid teal"
                          borderRadius="lg" overflow="hidden">
                        <CardHeader pb={0}>
                            <Box textAlign="center" fontSize="xl" fontWeight="bold">
                                Order Summary
                            </Box>
                        </CardHeader>
                        <CardBody>
                            <Table size="sm" mt={4}>
                                <Thead>
                                    <Tr>
                                        <Th>Product / Unit(s)</Th>
                                        <Th textAlign="end">
                                            Subtotal
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {order.products.map((item, index) => {
                                        const product = products.find((p) => parseInt(p.id) === item.product_id);
                                        const isLast = index === order.products.length - 1;

                                        console.log(item);

                                        if (!product) {
                                            return null;
                                        }

                                        return (<Tr key={item.product_id}>
                                            <Td fontSize="md"
                                                paddingBottom={isLast ? "3" : null}>{`${product.name}  X  ${item.quantity}`}</Td>
                                            <Td fontSize="md" bottom={5}
                                                textAlign="end">{`${(product.price * item.quantity).toFixed(2)} $`}</Td>


                                        </Tr>);
                                    })}
                                </Tbody>
                                <Tfoot borderTop="2px solid teal">
                                    <Tr>
                                        <Th fontSize="md" color="teal" paddingTop="3">
                                            Total
                                        </Th>
                                        <Th fontSize="md" textAlign="end" color="teal" paddingTop="3">
                                            {`${order.total.toFixed(2)} $`}
                                        </Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </CardBody>
                    </Card>
                </Box>
            </Flex>
        </MotionBox>
    </Container>);
}
