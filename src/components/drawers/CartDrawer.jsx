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
import {AddIcon, DeleteIcon, MinusIcon} from "@chakra-ui/icons";
import CartSvg from "../../assets/Cart.svg";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchUserCart, decreaseQuantity, increaseQuantity, removeItem,
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
    const userId = user.id;

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

    const goToCart = () => {
        onClose();
        navigate("/cart");
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


    return (<>
        <Box
            as="span"
            onClick={() => onOpen()}
            position="relative"
            display="inline-block"
            cursor="pointer"
        >
            <img src={CartSvg} alt="cart"/>
            {cartItems.length !== 0 && (<Badge
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
                {cartItems.length > 0 && (<span>{cartItems.length}</span>)}
            </Badge>)}
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
                    Your Cart
                </DrawerHeader>
                <DrawerBody>
                    {/* Display cart items */}
                    {cartItems.map((item) => {
                        const product = products.find((p) => p.id === item.product_id);

                        if (!product) {
                            return null;
                        }

                        return (<Box
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
                                <Text>{`$${product.price.toFixed(2)} each`}</Text>
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
                                        onClick={() => increaseProductQuantity({userId, productId: product.id})}
                                        aria-label="Increment"
                                        mr={2}
                                    />
                                    <IconButton
                                        icon={<MinusIcon/>}
                                        size="sm"
                                        onClick={() => decreaseProductQuantity({userId, productId: product.id})}
                                        aria-label="Decrement"
                                        mr={2}
                                    />
                                    <IconButton
                                        icon={<DeleteIcon/>}
                                        size="sm"
                                        onClick={() => removeFromCart({userId, productId: product.id})}
                                        aria-label="Remove"
                                        colorScheme="red"
                                    />
                                </Flex>
                            </Flex>
                            <Divider mt={2}/>
                        </Box>);
                    })}
                </DrawerBody>
                <DrawerFooter
                    py={8}
                    gap={5}
                    display={"grid"}
                    gridTemplateColumns={"auto 1fr"}
                    justifyContent="center"
                >
                    <Text fontWeight="bold" fontSize="lg">
                        {`Total: $${calculateTotal(cartItems).toFixed(2)}`}
                    </Text>
                    <Button
                        colorScheme="teal"
                        onClick={() => goToCheckout()}
                        fontSize="sm"
                    >
                        Checkout
                    </Button>
                    {cartItems.length !== 0 && (<Button
                        colorScheme="red" // Use a distinctive color for the "Clear Cart" button
                        variant="outline"
                        onClick={() => console.log("Clear Cart")}
                        fontSize="sm"
                    >
                        Clear Cart
                    </Button>)}
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
    </>);
}
