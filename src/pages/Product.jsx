import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {Badge, Box, Button, Container, Flex, Grid, GridItem, Icon, Image, Text, VStack,} from "@chakra-ui/react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {addToCart} from "../features/cart/cartAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import Number_input from '../components/inputs/Number_Input'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {StarIcon} from "@chakra-ui/icons";
import InfoPanel from "../components/panels/InfoPanel.jsx";
import ReviewsCard from "../components/cards/ReviewsCard.jsx";
import SuggestedProductCard from "../components/cards/SuggestedProductCard.jsx";
import StarRating from "../components/Feedbacks/StarRating.jsx";

const MotionBox = motion(Box);

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {reviews} = useSelector((state) => state.reviews);
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const product = products.find((product) => parseInt(product.id) === parseInt(id));

    const [quantity, setQuantity] = useState(10);
    const [productImages, setProductImages] = useState([]);
    const [mainImage, setMainImage] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    const mainImageRef = useRef(null);

    let userId = null;

    if (user) {
        userId = user.id;
    }

    useEffect(() => {
        console.log(quantity)
    }, [quantity])

    useEffect(() => {
         window.scrollTo({ top: 0, behavior: "smooth" });
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
                <InfoPanel product={product}/>
                <Flex
                    w="100%"
                    bg={"white"}
                    borderRadius="lg"
                    boxShadow="lg"
                    flexDirection={{base: "column", md: "row-reverse"}}
                >
                    <Box
                        width="auto"
                        flex={2}
                        px="4rem"
                        py="2rem"
                        m={{base: 0, md: 4}}
                        textAlign="left"
                    >
                        <Flex alignItems="center" mb={6} justify="space-between">
                            <Flex
                                flexDirection={"column"}
                                alignItems="flex-start"
                                color="gray.600"
                                fontWeight="bold"
                                gap={2}
                            >
                                <Text
                                    fontSize="4xl"
                                    fontWeight="bold"
                                    fontFamily="heading"
                                    color="gray.800"
                                >
                                    {product.name}
                                </Text>
                                <Box>
                                    <Badge colorScheme="teal" size={"sm"} px={2} variant={"solid"} borderRadius={"xl"}
                                           fontSize={10} pt={1}>
                                        <Flex alignItems={"center"}>
                                            <Icon as={StarIcon} mb={1.5} mr={1} w={2.5} h={2.5}/>
                                            <Text fontSize='sm' fontWeight='bold'>{product.rating}</Text>
                                        </Flex>
                                    </Badge>
                                    {product.category.map((c, index) => (
                                        <Badge
                                            key={index}
                                            colorScheme="teal"
                                            size={"md"}
                                            px={2}
                                            variant={"solid"}
                                            borderRadius={"xl"}
                                            fontSize='sm'
                                            pt={1}
                                            ml={2}
                                        >
                                            {c}
                                        </Badge>
                                    ))}
                                </Box>
                            </Flex>
                            <Flex
                                flexDirection={"column"}
                                alignItems="center"
                                color="gray.600"
                                fontWeight="bold"
                                gap={2}
                            >
                                <StarRating product={product}/>
                                <Text>
                                    {product.rating} of 5 ({reviews.length}{" "} reviews)
                                </Text>
                            </Flex>
                        </Flex>
                        <Text fontSize="2xl" color="teal.500" fontWeight="bold" mb={4}>
                            ${product.price.toFixed(2)}
                        </Text>
                        <Text fontSize="lg" color="gray.700" mb={6}>
                            {product.description}
                        </Text>
                        <Text fontSize="md" color="gray.600" mb={4}>
                            <strong>Available Stock:</strong> {product.stock} units
                        </Text>

                        <Number_input
                            handleChange={(value) => setQuantity(value)}
                            value={quantity} max={product.stock}
                        />
                        <Flex gap={4} mt={6}>
                            <Button
                                colorScheme="teal"
                                size="lg"
                                isDisabled={true}
                                // onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                size="lg"
                                onClick={() => isAuthenticated ? dispatch(addToCart({
                                    userId,
                                    productId: product.id,
                                    quantity: product.stock > quantity ? quantity : product.stock
                                })) : alert("Please login to add to cart")}>
                                Add to Cart
                            </Button>
                        </Flex>
                    </Box>

                    <Box display={"flex"} flexDirection={"row-reverse"} gap={4} borderRadius="lg"
                         bg={"white"} p={4} textAlign="center">


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
                                // _hover={{transform: "scale(1.05)", transition: "all 0.2s ease-in-out"}}
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
                                    transition="all 0.2s ease-in-out"
                                    _hover={{opacity: 1, bg: "gray.100", transition: "all 0.2s ease-in-out"}}
                                    w={"50px"}
                                    h={"50px"}
                                    bg={"white"}
                                    boxShadow={"md"}
                                >
                                    <FiChevronLeft/>
                                </Button>
                                <Zoom>
                                    <Image
                                        src={`/${mainImage}`}
                                        fallbackSrc="https://via.placeholder.com/600"
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
                                    transition="all 0.2s ease-in-out"
                                    _hover={{opacity: 1, bg: "gray.100", transition: "all 0.2s ease-in-out"}}
                                    w={"50px"}
                                    h={"50px"}
                                    bg={"white"}
                                    boxShadow={"md"}
                                >
                                    <FiChevronRight/>
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
                                    bg: "teal.500", cursor: "pointer",
                                    transition: "all 0.2s ease-in-out",
                                    // transform: "scale(1.1)"
                                }}
                                transition={"all 0.2s ease-in-out"}
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
                                    src={`/${thumbnail}`}
                                    fallbackSrc="https://via.placeholder.com/200"
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

                <Flex gap={4} w="100%" flexDirection={"row-reverse"}>
                    <SuggestedProductCard/>
                    <ReviewsCard product={product}/>
                </Flex>
            </VStack>
        </MotionBox>
    </Container>);
};

export default Product;
