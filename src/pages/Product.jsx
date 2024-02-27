import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {
    Box, Text, Image, Flex, Container, Grid, GridItem, Button,
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {addToCart} from "../features/cart/cartAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import Number_input from '../components/inputs/Number_Input'

const MotionBox = motion(Box);

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const product = products.find((product) => product.id === id);
    const [quantity, setQuantity] = useState(10);

    let userId = null;

    if (user) {
        userId = user.id;
    }

    useEffect(() => {
        dispatch(setCurrentPage("product"));
        console.log(quantity)
    }, [dispatch, quantity]);

    const productImages = product.images;

    const [mainImage, setMainImage] = useState(productImages[0]);

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (<Container maxW="container.xxl">
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
                    flexDirection={{base: "column", md: "row-reverse"}}
                    alignItems={{base: "center", md: "stretch"}}
                    p={{base: 4, md: 8}}
                >
                    <Box flex={2} p={8} textAlign="left">
                        <Text
                            fontSize="5xl"
                            fontWeight="bold"
                            mb={2}
                            fontFamily="'Playfair Display', serif"
                        >
                            {product.name}
                        </Text>
                        <Text color="teal.500" fontSize="3xl" mb={4}>
                            ${product.price.toFixed(2)}
                        </Text>
                        <Text fontSize="xl" mb={4} color="gray.700">
                            {product.description}
                        </Text>
                        <Text fontSize="lg" color="gray.500">
                            <strong>Avaliable Stock :</strong> {product.stock} units
                        </Text>

                        <Number_input
                            handelChange={(value) => setQuantity(value)}
                            value={quantity}
                        />

                        <Flex gap={2}>
                            <Button
                                colorScheme="teal"
                                size="lg"
                                mt={4}>
                                Buy Now
                            </Button>
                            <Button
                                colorScheme="teal"
                                variant={"outline"}
                                size="lg"
                                mt={4}
                                onClick={() => isAuthenticated ?
                                    dispatch(addToCart({userId, productId: product.id, quantity}))
                                    : alert("Please login to add to cart")}
                            >
                                Add to Cart
                            </Button>
                        </Flex>
                    </Box>

                    <Box display={"flex"} flexDirection={"row-reverse"} gap={6} textAlign="center">
                        <Image
                            src={mainImage}
                            alt={`Product ${id}`}
                            bg={"gray.100"}
                            border={"1px solid gray.200"}
                            mb={4}
                            borderRadius="lg"
                            boxShadow="lg"
                            maxW="100%"
                            maxH="500px"
                        />

                        <Grid templateRows="repeat(5, 1fr)" gap={3}>
                            {productImages.map((thumbnail, index) => (<GridItem
                                    key={index}
                                    display="flex"
                                    justifyItems="center"
                                    cursor="pointer"
                                    onClick={() => setMainImage(thumbnail)}
                                    borderRadius="md"
                                    border="1px solid gray.200"
                                    bg={mainImage === thumbnail ? "teal.300" : "gray.100"}
                                    _hover={{
                                        border: "2px solid teal", bg: "teal.100", boxShadow: "md",
                                    }}
                                    maxW="70px"
                                    maxH="70px"
                                    p={"1.5"}
                                >
                                    <Image
                                        src={thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        objectFit="cover"
                                        w="100%"
                                        h="100%"
                                    />
                                </GridItem>))}
                        </Grid>

                    </Box>
                </Flex>
            </MotionBox>
        </Container>);
};

export default Product;
