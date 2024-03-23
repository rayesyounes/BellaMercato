import {
    Badge, Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import {addToCart} from "../../features/cart/cartAction.js";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {StarIcon} from "@chakra-ui/icons";
import {useState} from "react";

function ProductCard({product}) {
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const [image, setImage] = useState(product.images[0]);
    let userId = null;

    if (user) {
        userId = user.id;
    }


    const productState = () => {
        const {stock, createdAt} = product;
        const date = new Date(createdAt);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (stock > 0 && diffDays < 30) {
            return (<Badge colorScheme="teal" size={"sm"} px={2} variant={"subtle"} borderRadius={"xl"} fontSize={10}
                           pt={1}>
                <Flex alignItems={"center"}>
                    <Text fontSize='sm' fontWeight='bold'>New</Text>
                </Flex>
            </Badge>)
        } else if (stock < 1) {
            return (<Badge colorScheme="teal" size={"sm"} px={2} variant={"subtle"} borderRadius={"xl"} fontSize={10}
                           pt={1}>
                <Flex alignItems={"center"}>
                    <Text fontSize='sm' fontWeight='bold'>Out of Stock</Text>
                </Flex>
            </Badge>)
        } else {
            return null
        }

    }

    // const handelImageChange = (id) => () => {
    //     setInterval(() => {
    //         const curProduct = products.find((product) => product.id === id);
    //         const index = curProduct.images.indexOf(image);
    //         setImage(prev => {
    //             if (index === curProduct.images.length - 1) {
    //                 return curProduct.images[0]
    //             } else {
    //                 return curProduct.images[index + 1]
    //             }
    //         })
    //     }, 2000);
    // }


    return (<Card boxShadow="md" borderRadius="lg" minH={"70vh"}>
        <CardBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            position={"relative"}
        >
            <Image
                src={`/${image}`}
                _hover={{
                    transform: "scale(1.08)", transition: "all 0.4s ease-in-out",
                }}
                // onMouseEnter={handelImageChange(product.id)}
                fallbackSrc="https://via.placeholder.com/600"
                alt={`${name} - Product image`}
                borderRadius="lg"
                boxSize="250px"
                objectFit="cover"
                transition="all 0.2s ease-in-out"
            />
            <Flex gap={1} position={"absolute"} right={4} top={4}>
                {productState()}
                <Badge colorScheme="teal" size={"sm"} px={2} variant={"outline"} borderRadius={"xl"}
                       fontSize={10} pt={1}>
                    <Flex alignItems={"center"}>
                        <Icon as={StarIcon} mb={1.5} mr={1} w={2.5} h={2.5}/>
                        <Text fontSize='sm' fontWeight='bold'>{product.rating}</Text>
                    </Flex>
                </Badge>
            </Flex>
            <Flex  mt="6" gap={5} flexDirection={"column"} justifyContent={"space-between"} width={"100%"} height={"100%"} >
                <Stack spacing={3}>
                    <Heading size="md">{product.name}</Heading>
                    <Text>{product.description}</Text>
                </Stack>
                <Text color="teal.400" fontSize="2xl">{`$${product.price}`}</Text>
            </Flex>
        </CardBody>
        <CardFooter
            display="flex"
            justifyContent="flex-end"
            borderTopWidth="1px"
            borderColor="gray.200"
            pt="4"
        >
            <ButtonGroup>
                <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => isAuthenticated ? dispatch(addToCart({
                        userId, productId: product.id, quantity: 1
                    })) : alert('Please login to add to cart')}
                >
                    Add to Cart
                </Button>
                <Button
                    as={Link}
                    to={`/product/${product.id}`}
                    variant="outline"
                    colorScheme="teal"
                >
                    View Details
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>);
}

export default ProductCard;
