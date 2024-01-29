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
    Icon,
    Text,
    Divider,
    IconButton,
    Badge,
    DrawerFooter,
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, MinusIcon} from "@chakra-ui/icons";
import EmptyCartSvg from "../../assets/EmptyCart.svg";
import CartSvg from "../../assets/Cart.svg";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchUserCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    clearCart,
} from "../../features/cart/cartAction";
import {getProductsAsync} from "../../features/products/productsAction";

export default function CartDrawer() {
    const dispatch = useDispatch();
    const {items} = useSelector((state) => state.userCart);
    const {products} = useSelector((state) => state.products);
    const {user} = useSelector((state) => state.auth);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
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

    const goToCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    const increaseProductQuantity = ({userId, productId, total}) => {
        dispatch(increaseQuantity({userId, productId, total}));
    };

    const decreaseProductQuantity = ({userId, productId, total}) => {
        dispatch(decreaseQuantity({userId, productId, total}));
    };

    const removeFromCart = async ({userId, productId, total}) => {
        dispatch(removeItem({userId, productId, total}));
    };

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((acc, item) => {
            const product = products.find((p) => p.id === item.product_id);
            if (!product) {
                return acc;
            }
            return acc + product.price * item.quantity;
        }, 0);
    };

    const handelClearCart = (userId) => {
        dispatch(clearCart(userId));
        setCartItems([]);
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
                <img src={CartSvg} alt="cart"/>
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
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader
                        textAlign="center"
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Your Cart {cartItems.length === 0 && "is empty"}
                    </DrawerHeader>
                    <DrawerBody>
                        {cartItems.length === 0 && (
                            <Box textAlign="center" mt={130}>
                                <Box maxW="300px" mx="auto">
                                    <img
                                        src={EmptyCartSvg}
                                        alt="Empty Cart"
                                        width="100%"
                                        style={{borderRadius: "8px"}} // Add border-radius for a nicer look
                                    />
                                </Box>
                            </Box>
                        )}
                        {/* Display cart items */}
                        {cartItems.map((item) => {
                            const product = products.find(
                                (p) => p.id === item.product_id
                            );

                            if (!product) {
                                return null;
                            }

                            return (
                                <Box
                                    key={item.product_id}
                                    mb={4}
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="md"
                                >
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                    >
                                        <Text fontWeight="bold">
                                            {product.name}
                                        </Text>
                                        <Text>{`$${product.price.toFixed(
                                            2
                                        )} each`}</Text>
                                    </Flex>
                                    <Flex
                                        mt={2}
                                        justify="space-between"
                                        align="center"
                                    >
                                        <Text>{`Quantity: ${item.quantity}`}</Text>
                                        <Flex align="center">
                                            <IconButton
                                                icon={<AddIcon/>}
                                                size="sm"
                                                isDisabled={
                                                    item.quantity >=
                                                    product.stock
                                                }
                                                onClick={() =>
                                                    increaseProductQuantity({
                                                        userId,
                                                        productId: product.id,
                                                    })
                                                }
                                                aria-label="Increment"
                                                mr={2}
                                            />
                                            <IconButton
                                                icon={<MinusIcon/>}
                                                size="sm"
                                                isDisabled={item.quantity <= 1}
                                                onClick={() =>
                                                    decreaseProductQuantity({
                                                        userId,
                                                        productId: product.id,
                                                    })
                                                }
                                                aria-label="Decrement"
                                                mr={2}
                                            />
                                            <IconButton
                                                icon={<DeleteIcon/>}
                                                size="sm"
                                                onClick={() =>
                                                    removeFromCart({
                                                        userId,
                                                        productId: product.id,
                                                    })
                                                }
                                                aria-label="Remove"
                                                colorScheme="red"
                                            />
                                        </Flex>
                                    </Flex>
                                    <Divider mt={2}/>
                                </Box>
                            );
                        })}
                    </DrawerBody>
                    {cartItems.length !== 0 ? (
                        <DrawerFooter
                            py={8}
                            gap={5}
                            display={"grid"}
                            gridTemplate={"1fr auto / 1fr auto"}
                            justifyContent="center"
                        >
                            <Text
                                fontWeight="bold"
                                fontSize="lg"
                                gridColumn={"1 / -1"}
                            >
                                {`Total: $${calculateTotal(cartItems).toFixed(
                                    2
                                )}`}
                            </Text>
                            <Button
                                colorScheme="teal"
                                onClick={() => goToCheckout()}
                                fontSize="sm"
                            >
                                Proceed To Checkout
                            </Button>
                            {cartItems.length !== 0 && (
                                <Button
                                    colorScheme="red"
                                    variant="outline"
                                    onClick={() => handelClearCart(userId)}
                                    fontSize="sm"
                                >
                                    Clear Cart
                                </Button>
                            )}
                        </DrawerFooter>
                    ) : (
                        <DrawerFooter
                            py={4}
                            gap={5}
                            display={"grid"}
                            gridTemplate={"1fr auto / 1fr auto"}
                            justifyContent="center"
                        >
                            <Button
                                gridColumn={"1/-1"}
                                colorScheme="teal"
                                onClick={() => {
                                    onClose();
                                    navigate("/shop");
                                }}
                                fontSize="sm"
                            >
                                L E T ' S &nbsp; G O &nbsp; S H O P P I N G
                            </Button>
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
