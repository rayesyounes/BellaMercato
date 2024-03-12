import {
    CardFooter, CardBody, Image, Stack, Heading, Text, ButtonGroup, Button, Card, Flex, Icon, Badge,
} from "@chakra-ui/react";
import {addToCart} from "../../features/cart/cartAction.js";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {StarIcon} from "@chakra-ui/icons";

function ProductCard({product}) {
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state) => state.auth);
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


    return (<Card boxShadow="md" borderRadius="lg">
        <CardBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            position={"relative"}
        >
            <Image
                src={product.images[0]}
                fallbackSrc="https://via.placeholder.com/600"
                alt={`${name} - Product image`}
                borderRadius="lg"
                boxSize="250px"
                objectFit="cover"
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
            <Stack mt="6" spacing="3">
                <Heading size="md">{product.name}</Heading>
                <Text>{product.description}</Text>
                <Text color="teal.400" fontSize="2xl">{`$ ${product.price}`}</Text>
            </Stack>
        </CardBody>
        <CardFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
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
