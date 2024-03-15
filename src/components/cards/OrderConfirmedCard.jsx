import {Badge, Box, Divider, Flex, Heading, Text} from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {useSelector} from "react-redux";
import OrderSubmitAlert from "../alerts/OrderSubmitedAlert.jsx";
import {useEffect, useState} from "react";

const MotionBox = motion(Box);

export default function OrderConfirmed({data, order}) {
    const {products} = useSelector((state) => state.products);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        setTimeout(() => {
                setSubmit(true);
            }
            , 1300);
    }, []);

    return (<Flex
        direction="column"
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
    >
        <MotionBox
            width="100%"
            py="4"
            borderRadius="lg"
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
        >
            <Box
                display={"grid"}
                gridTemplateColumns={"3fr 2fr"}
                gap={5}
                align="start"
            >
                <Flex
                    direction="row"
                    gap={6}
                    w="100%"
                    p={6}
                    bg="white"
                    boxShadow={"0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.05)"}
                    borderRadius="md"
                >
                    <Box>
                        <Heading as="h2" fontSize="xl" mb={3}>
                            Order Summary
                        </Heading>
                        <Text>
                            <strong>Order Status:</strong>{" "}
                            <Badge colorScheme="orange">{order.status}</Badge>
                        </Text>
                        <Text>
                            <strong>Order Number:</strong> {data.orderNumber}
                        </Text>
                        <Text>
                            <strong>Order Date:</strong> {order.order_date}
                        </Text>
                        <Text>
                            <strong>Order Total:</strong> $ {order.total}
                        </Text>
                        <Text>
                            <strong>Order Details:</strong>{" "}
                            {order.products.map((item, index) => {
                                const product = products.find((product) => product.id === item.product_id);
                                return (<Text key={index}>
                                    {product.name} x ({item.quantity})
                                </Text>);
                            })}
                        </Text>
                    </Box>

                    <Divider orientation="vertical"
                             borderLeft="1px solid"
                             borderColor="gray.200"
                             height="100%"
                             alignSelf="stretch"
                             mx={5}
                    />

                    <Box>
                        <Heading as="h2" fontSize="xl" mb={3}>
                            Delivery Details
                        </Heading>
                        <Box>
                            <Heading as="h4" fontSize="md" fontWeight="semibold">
                                Address
                            </Heading>
                            <Text>
                                {data.address}, {data.city}, {data.state}, {data.country},{" "}
                                {data.postcode}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                Expected Delivery: {data.expectedDelivery}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <OrderSubmitAlert status={
                    submit ? "success" : "loading"
                }/>
            </Box>
        </MotionBox>
    </Flex>);
}
