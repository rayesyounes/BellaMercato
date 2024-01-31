import {
    Button,
    Flex,
    Box,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tfoot,
    FormControl,
    FormLabel,
    Input,
    Card,
    CardHeader,
    CardBody, Divider, Spacer,
} from "@chakra-ui/react";
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const MotionBox = motion(Box);

export default function CheckoutCard({step, handelConfirm, setStep, data, confirmed}) {
    const {items, user_id, total} = useSelector((state) => state.userCart);
    const {products} = useSelector((state) => state.products);


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
            <Box display={"grid"} gridTemplateColumns={"3fr 2fr"} gap={5} align="start">

                <Flex direction="column" gap={3} w={"100%"}>

                    <Flex flexDirection={"row"} gap={3}>
                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>Full Name</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.cardName}/>

                        </FormControl>


                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>Phone</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.phone}/>

                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>Email</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.emailAddress}/>

                        </FormControl>
                    </Flex>
                    <FormControl mb="4">
                        <FormLabel color={"teal.500"}>Address</FormLabel>
                        <Input type={"text"} isReadOnly variant={"flushed"} value={data.address}/>

                    </FormControl>
                    <Flex flexDirection={"row"} gap={3}>

                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>Country</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.country}/>

                        </FormControl>

                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>State</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.state}/>

                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>City</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.city}/>
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel color={"teal.500"}>Postcode</FormLabel>
                            <Input type={"text"} isReadOnly variant={"flushed"} value={data.postcode}/>

                        </FormControl>


                    </Flex>
                    {data.notes && (<FormControl mb="4">
                        <FormLabel>Notes :</FormLabel>
                        <Input type={"text"} isReadOnly variant={"flushed"} value={data.notes}/>

                    </FormControl>)}
                </Flex>

                <Card maxW="500px" bg="gray.100" border="2px solid teal"
                 borderRadius="lg" overflow="hidden">
                    <CardHeader pb={0}>
                        <Box textAlign="center"fontSize="xl" fontWeight="bold" >
                            Order Summary
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th >Product / Unit(s)</Th>
                                    <Th textAlign="end">
                                        Subtotal
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {items.map((item, index) => {
                                    const product = products.find((p) => p.id === item.product_id);
                                    const isLast = index === items.length - 1;

                                    if (!product) {
                                        return null;
                                    }

                                    return (
                                        <Tr key={item.product_id}>
                                            <Td fontSize="md" paddingBottom={isLast ? "3" : null}>{`${product.name}  X  ${item.quantity}`}</Td>
                                            <Td fontSize="md" bottom={5} textAlign="end" >{`${(product.price * item.quantity).toFixed(2)} $`}</Td>
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
                                        {`${total.toFixed(2)} $`}
                                    </Th>
                                </Tr>
                            </Tfoot>

                        </Table>
                    </CardBody>
                </Card>

            </Box>
        </MotionBox>

        <VStack align="stretch">
            <Flex
                direction={"row"}
                alignItems="center"
                justifyContent={step <= 0 ? "flex-end" : "space-between"}
            >
                <Button
                    colorScheme="gray"
                    variant={"solid"}
                    size="md"
                    onClick={() => setStep(prevState => prevState - 1)}
                >
                    Back
                </Button>

                <Button
                    colorScheme="teal"
                    size="md"
                    onClick={() => handelConfirm()}
                >
                    Confirm
                </Button>
            </Flex>
        </VStack>
    </Flex>)
}

CheckoutCard.propTypes = {
    step: PropTypes.number.isRequired, handelConfirm: PropTypes.func.isRequired, setStep: PropTypes.func.isRequired,
};