import {
    Box,
    Container,
    VStack,
    Badge,
    Text,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Table,
    Flex
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersAsync } from "../features/orders/ordersAction.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import setCurrentPage from "../features/page/PageAction.js";

export default function CheckoutConfirmAlert() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { orders } = useSelector((state) => state.orders);
    const { products } = useSelector((state) => state.products);
    const [order, setOrder] = useState({
        id: null,
        status: null,
        order_date: null,
        total: 0,
        products: []
    });

    useEffect(() => {
        dispatch(setCurrentPage("order"));
        dispatch(getOrdersAsync());
        setOrder(orders.find((order) => order.id === parseInt(id)));
    }, [dispatch, id]);

    return (
        <Container maxW="container.xxl" minHeight={"lg"} my={4}>
            <VStack spacing={4}>

                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
                    p={4}
                    w="100%"
                >
                    {order && (
                        <Box
                            display={"grid"}
                            gridTemplateColumns={"1fr 2fr"}
                            gap={5}
                            align="start"
                            rounded="md"
                            boxShadow="lg"
                            bg="gray.100"
                            p={6}
                        >
                            <Flex
                                direction="column"
                                gap={6}
                                w="100%"
                                p={6}
                                bg="white"
                                boxShadow="lg"
                                borderRadius="md"
                            >
                                <Text>
                                    <strong>Order Number:</strong> {order.id}
                                </Text>
                                <Text>
                                    <strong>Order Status:</strong>{" "}
                                    <Badge
                                        colorScheme={
                                            order.status === "processing"
                                                ? "orange"
                                                : order.status === "confirmed"
                                                    ? "blue"
                                                    : order.status === "cancelled"
                                                        ? "red"
                                                        : order.status === "delivered"
                                                            ? "green"
                                                            : "gray"
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </Text>
                                <Text>
                                    <strong>Order Date:</strong>{" "}
                                    {new Date(order.order_date).toLocaleString()}
                                </Text>
                                <Text>
                                    <strong>Order Total:</strong> ${order.total.toFixed(2)}
                                </Text>
                            </Flex>

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
                                        const product = products.find((p) => p.id === item.product_id);
                                        const isLast = index === order.products.length - 1;

                                        if (!product) {
                                            return null;
                                        }

                                        return (
                                            <Tr key={item.product_id}>
                                                <Td fontSize="md" paddingBottom={isLast ? "3" : null}>{`${product.name}  X  ${item.quantity}`}</Td>
                                                <Td fontSize="md" Bottom={5} textAlign="end" >{`${(product.price * item.quantity).toFixed(2)} $`}</Td>
                                            </Tr>
                                        );
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
                        </Box>
                    )}

                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </Container>
    );
}
