import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Text,
    Image,
    Flex,
    Container,
    Grid,
    GridItem,
    Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addToCart } from "../features/cart/cartAction.js";
import { setCurrentPage } from "../features/page/PageAction.js";

const MotionBox = motion(Box);

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.page);
    const { products } = useSelector((state) => state.products);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const product = products.find((product) => product.id === parseInt(id));
    let userId = null;

    if (user) {
        userId = user.id;
    }

    useEffect(() => {
        dispatch(setCurrentPage("product"));
    }, [dispatch]);

    const productImages = [
        "https://via.placeholder.com/800x800",
        "https://via.placeholder.com/800x800",
        "https://via.placeholder.com/800x800",
        "https://via.placeholder.com/800x800",
        "https://via.placeholder.com/800x800",
    ];

    const [mainImage, setMainImage] = useState(productImages[0]);

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <Container maxW="container.xxl">
            <MotionBox
                p={8}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Flex
                    borderRadius="lg"
                    boxShadow="xl"
                    bgColor="white"
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "stretch" }}
                    p={{ base: 4, md: 8 }}
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
                            <strong>Stock:</strong> {product.stock} units
                        </Text>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            mt={8}
                            onClick={() =>
                                isAuthenticated
                                    ? dispatch(
                                          addToCart({
                                              userId,
                                              productId: product.id,
                                          })
                                      )
                                    : alert("Please login to add to cart")
                            }
                        >
                            Add to Cart
                        </Button>
                    </Box>

                    <Box flex={1} textAlign="center">
                        <Image
                            src={mainImage}
                            alt={`Product ${id}`}
                            mb={4}
                            borderRadius="lg"
                            boxShadow="lg"
                            maxW="100%"
                            maxH="500px"
                        />

                        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                            {productImages.map((thumbnail, index) => (
                                <GridItem key={index}>
                                    <Image
                                        src={thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        cursor="pointer"
                                        onClick={() => setMainImage(thumbnail)}
                                        borderRadius="lg"
                                        border="2px solid transparent"
                                        _hover={{
                                            border: "2px solid teal.500",
                                        }}
                                        maxW="100%"
                                        maxH="100px"
                                    />
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </Flex>
            </MotionBox>
        </Container>
    );
};

export default Product;
