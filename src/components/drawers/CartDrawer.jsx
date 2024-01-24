import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    Button,
    Flex,
    Text,
    Divider,
    IconButton,
    Badge,
    DrawerFooter,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import CartSvg from "../../assets/Cart.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { fetchUserCart } from "../../features/cart/cartAction";

export default function CartDrawer() {
    const dispatch = useDispatch();
    const { items, total } = useSelector((state) => state.userCart);
    const { products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cartItems, setCartItems] = useState([
        {
            product_id: 1,
            quantity: 2,
        },
        {
            product_id: 3,
            quantity: 1,
        },
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserCart(user.id));
    }, [dispatch, user.id]);

    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const calculateTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    };

    const goToCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    const goToCart = () => {
        onClose();
        navigate("/cart");
    };

    return (
        <>
            <Box
                as="span"
                onClick={() => onOpen()}
                position="relative"
                display="inline-block"
                cursor="pointer"
            >
                <img src={CartSvg} alt="cart" />
                {cartItems.length !== 0 && (
                    <Badge
                        w={4}
                        h={4}
                        alignContent={"center"}
                        justifyContent={"center"}
                        display={"flex"}
                        variant="solid"
                        borderRadius={10}
                        colorScheme="teal"
                        position="absolute"
                        top={0}
                        right={0}
                        transform="translate(50%, -50%)"
                    >
                        {cartItems.length > 0 && (
                            <span>{cartItems.length}</span>
                        )}
                    </Badge>
                )}
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader
                        textAlign="center"
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Your Cart
                    </DrawerHeader>
                    <DrawerBody>
                        {/* Display cart items */}
                        {cartItems.map((item) => (
                            <Box
                                key={item.product_id}
                                mb={4}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                            >
                                <Flex justify="space-between" align="center">
                                    <Text fontWeight="bold">product name</Text>
                                    <Text>{`$ price each`}</Text>
                                </Flex>
                                <Flex
                                    mt={2}
                                    justify="space-between"
                                    align="center"
                                >
                                    <Text>{`Quantity: ${item.quantity}`}</Text>
                                    <Flex align="center">
                                        <IconButton
                                            icon={<AddIcon />}
                                            size="sm"
                                            onClick={() =>
                                                console.log(
                                                    "Increment",
                                                    item.product_id
                                                )
                                            }
                                            aria-label="Increment"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<MinusIcon />}
                                            size="sm"
                                            onClick={() =>
                                                console.log(
                                                    "Decrement",
                                                    item.product_id
                                                )
                                            }
                                            aria-label="Decrement"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            size="sm"
                                            onClick={() =>
                                                console.log("Remove", item.product_id)
                                            }
                                            aria-label="Remove"
                                            colorScheme="red"
                                        />
                                    </Flex>
                                </Flex>
                                <Divider mt={2} />
                            </Box>
                        ))}
                    </DrawerBody>
                    <DrawerFooter
                        py={8}
                        gap={5}
                        display={"grid"}
                        gridTemplateColumns={"auto 1fr"}
                        justifyContent="center"
                    >
                        <Text fontWeight="bold" fontSize="lg">
                            {`Total: $${total}`}
                        </Text>
                        <Button
                            colorScheme="teal"
                            onClick={() => goToCheckout()}
                            fontSize="sm"
                        >
                            Checkout
                        </Button>
                        {cartItems.length !== 0 && (
                            <Button
                                colorScheme="red" // Use a distinctive color for the "Clear Cart" button
                                variant="outline"
                                onClick={() => console.log("Clear Cart")}
                                fontSize="sm"
                            >
                                Clear Cart
                            </Button>
                        )}
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => goToCart()}
                            fontSize="sm"
                        >
                            Go to Cart
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
