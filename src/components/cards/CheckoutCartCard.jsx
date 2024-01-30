import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Flex, IconButton, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getProductsAsync} from "../../features/products/productsAction.js";
import {
    decreaseQuantity, fetchUserCart, increaseQuantity, removeItem
} from "../../features/cart/cartAction.js";
import {AddIcon, DeleteIcon, MinusIcon} from "@chakra-ui/icons";
import {motion} from "framer-motion";


export default function CheckoutCartCard({step, setStep}) {
    const dispatch = useDispatch();
    const MotionBox = motion(Box);
    const {items} = useSelector((state) => state.userCart);
    const {products} = useSelector((state) => state.products);
    const {user} = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState([]);
    let userId = null;

    if (user) {
        userId = user.id;
    }

    useEffect(() => {
        dispatch(getProductsAsync());
        dispatch(fetchUserCart(userId));
    }, []);

    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const increaseProductQuantity = ({userId, productId, total}) => {
        dispatch(increaseQuantity({userId, productId, total}));
    };

    const decreaseProductQuantity = ({userId, productId, total}) => {
        dispatch(decreaseQuantity({userId, productId, total}));
    };

    const removeFromCart = async ({userId, productId, total}) => {
        dispatch(removeItem({userId, productId, total}));
    };

    return (<Flex flexDirection={"column"} overflow={"scroll"} initial={{opacity: 0, y: -50}}
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
            {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.product_id);

                if (!product) {
                    return null;
                }

                return (<Flex
                    key={item.product_id}
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    w={"100%"}
                    mb={4}
                    p={2}
                    borderWidth="1px"
                    borderRadius="md"
                >

                    <Text fontWeight="bold" w={260}>{product.name}</Text>
                    <Text>{`$${product.price.toFixed(2)} / Unit`}</Text>
                    <Text>{`Quantity: ${item.quantity}`}</Text>
                    <Text>{`Sub Total: ${parseFloat(item.quantity * product.price).toFixed(2)}`}</Text>


                    <Flex align="center">
                        <IconButton
                            icon={<AddIcon/>}
                            size="sm"
                            isDisabled={item.quantity >= product.stock}
                            onClick={() => increaseProductQuantity({
                                userId, productId: product.id,
                            })}
                            aria-label="Increment"
                            mr={2}
                        />
                        <IconButton
                            icon={<MinusIcon/>}
                            size="sm"
                            isDisabled={item.quantity <= 1}
                            onClick={() => decreaseProductQuantity({
                                userId, productId: product.id,
                            })}
                            aria-label="Decrement"
                            mr={2}
                        />
                        <IconButton
                            icon={<DeleteIcon/>}
                            size="sm"
                            onClick={() => removeFromCart({
                                userId, productId: product.id,
                            })}
                            aria-label="Remove"
                            colorScheme="red"
                        />
                    </Flex>
                </Flex>);
            })}
        </MotionBox>
        <VStack align="stretch">
            <Flex
                direction={"row"}
                alignItems="center"
                justifyContent={step <= 0 ? "flex-end" : "space-between"}
            >
                <Button
                    colorScheme="teal"
                    size="md"
                    onClick={() => setStep(prevState => prevState + 1)}
                >
                    Next
                </Button>

            </Flex>
        </VStack>


    </Flex>)
}