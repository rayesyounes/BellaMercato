import {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {
    Box, Text, Image, Flex, Container, Grid, GridItem, Button, Badge, Icon, VStack,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {addToCart} from "../features/cart/cartAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import Number_input from '../components/inputs/Number_Input'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {StarIcon} from "@chakra-ui/icons";
import InfoPanel from "../components/panels/InfoPanel.jsx";

const MotionBox = motion(Box);

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const product = products.find((product) => parseInt(product.id) === parseInt(id));

    const [quantity, setQuantity] = useState(10);
    const [productImages, setProductImages] = useState([]);
    const [mainImage, setMainImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const mainImageRef = useRef(null);

    let userId = null;

    if (user) {
        userId = user.id;
    }

    useEffect(() => {
        dispatch(setCurrentPage("product"));
        if (product) {
            setProductImages(product.images);
            setMainImage(product.images[0]);
        }
    }, [dispatch, quantity, product]);

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1));
        setMainImage(productImages[currentIndex]);
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1));
        setMainImage(productImages[currentIndex]);
    };

    const handleImageClick = () => {
        mainImageRef.current.style.cursor = "zoom-in";
    };

    const handleImageZoom = () => {
        mainImageRef.current.style.cursor = "zoom-out";
    };

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (<Container maxW="container.xxl" minHeight={"lg"} my={4}>
        <MotionBox
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <VStack spacing={4}>
                <InfoPanel product={product} />
            <Flex
                w="100%"
                borderRadius="lg"
                flexDirection={{base: "column", md: "row-reverse"}}
                gap={4}
            >
                <Box width={"auto"} flex={2} p={4} textAlign="left" bg={"white"} borderRadius="lg" boxShadow="lg">
                    <Text
                        fontSize="5xl"
                        fontWeight="bold"
                        mb={2}
                        fontFamily="'Playfair Display', serif"
                    >
                        {product.name}
                    </Text>
                    <Flex alignItems="center" mb={4}>
                        <Box>
                            {/* Display rating with star icon */}
                            <Icon as={StarIcon} color="teal.500" boxSize={6} mr={2} />
                            <Text fontSize="3xl" color="teal.500" fontWeight="bold">
                                {product.rating.toFixed(1)}
                            </Text>
                        </Box>
                        <Text fontSize="3xl" color="teal.500" fontWeight="bold" ml={4}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </Flex>
                    <Text fontSize="xl" mb={4} color="gray.700">
                        {product.description}
                    </Text>
                    <Text fontSize="lg" color="gray.500">
                        <strong>Available Stock :</strong> {product.stock} units
                    </Text>

                    {/* Rate button */}
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        size="lg"
                        mt={4}
                        onClick={() => handleRateProduct()}
                    >
                        Rate Product
                    </Button>

                    {/* Quantity input and Buy Now / Add to Cart buttons */}
                    <Flex gap={2} mt={4}>
                        <Number_input
                            handelChange={(value) => setQuantity(value)}
                            value={quantity}
                        />
                        <Button
                            colorScheme="teal"
                            size="lg"
                            onClick={() => handleBuyNow()}
                        >
                            Buy Now
                        </Button>
                        <Button
                            colorScheme="teal"
                            variant={"outline"}
                            size="lg"
                            onClick={() => isAuthenticated ? dispatch(addToCart({ userId, productId: product.id, quantity })) : alert("Please login to add to cart")}
                        >
                            Add to Cart
                        </Button>
                    </Flex>
                </Box>

                <Box display={"flex"} flexDirection={"row-reverse"} gap={4} borderRadius="lg"
                     bg={"white"} boxShadow="lg" p={4} textAlign="center">


                    <Box
                        bg={"gray.100"}
                        borderRadius="lg"
                        maxW={"500px"}
                        maxH={"500px"}
                        p={4}
                        ref={mainImageRef}
                        onClick={handleImageClick}
                        onMouseEnter={handleImageZoom}
                        onMouseLeave={() => mainImageRef.current.style.cursor = "default"}
                        position={"relative"}
                    >
                        <Box
                            position="relative"
                            borderRadius="lg"
                            maxW={"500px"}
                            maxH={"500px"}
                            p={4}
                        >
                            <Button
                                onClick={handlePrevImage}
                                zIndex={5}
                                position="absolute"
                                top="50%"
                                left="0"
                                borderRadius={"50%"}
                                transform="translate(0, -50%)"
                                // opacity={0}
                                transition="opacity 0.3s"
                                _hover={{ opacity: 1, bg:"gray.100" }}
                                w={"50px"}
                                h={"50px"}
                                bg={"white"}
                                boxShadow={"md"}
                            >
                                <FiChevronLeft />
                            </Button>
                            <Zoom>
                                <Image
                                    src={mainImage}
                                    alt={`Product ${id}`}
                                    bg={"gray.100"}
                                    border={"1px solid gray.200"}
                                    borderRadius="lg"
                                    cursor="zoom-in"
                                />
                            </Zoom>
                            <Button
                                onClick={handleNextImage}
                                zIndex={5}
                                position="absolute"
                                top="50%"
                                right="0"
                                borderRadius={"50%"}
                                transform="translate(0, -50%)"
                                // opacity={0}
                                transition="opacity 0.3s"
                                _hover={{ opacity: 1, bg:"gray.100" }}
                                w={"50px"}
                                h={"50px"}
                                bg={"white"}
                                boxShadow={"md"}
                            >
                                <FiChevronRight />
                            </Button>
                        </Box>
                    </Box>
                    <Grid templateRows={`repeat(${productImages.length}, 1fr)`}
                          justifyItems={"center"}
                          alignItems={"center"}
                          bg={"gray.100"}
                          borderRadius="lg"
                          p={2}
                          width={"100px"}
                    >
                        {productImages.map((thumbnail, index) => (<GridItem
                            key={index}
                            display="flex"
                            justifyItems="center"
                            cursor="pointer"
                            onClick={() => setMainImage(thumbnail)}
                            bg={thumbnail === mainImage ? "teal.500" : "gray.200"}
                            _hover={{
                                bg: "teal.500", cursor: "pointer", transition: "all 0.2s ease-in-out"
                            }}
                            // onMouseEnter={
                            //     () => setMainImage(thumbnail)
                            // }
                            borderRadius="lg"
                            boxShadow={"md"}
                            maxW="70px"
                            maxH="70px"
                            p={thumbnail === mainImage ? 1 : 0}
                        >
                            <Image
                                src={thumbnail}
                                alt={`Thumbnail ${index + 1}`}
                                filter={mainImage === thumbnail ? "none" : "grayscale(100%)"}
                                _hover={{
                                    filter: "none", cursor: "pointer", transition: "all 0.2s ease-in-out"
                                }}
                                borderRadius="md"
                                objectFit="cover"
                                w="100%"
                                h="100%"
                            />
                        </GridItem>))}
                    </Grid>

                </Box>
            </Flex>
            </VStack>
        </MotionBox>
    </Container>);
};

export default Product;
