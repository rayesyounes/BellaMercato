import {
    CardFooter, CardBody, Divider, Image, Stack, Heading, Text, ButtonGroup, Button, Card,
} from "@chakra-ui/react";
import {addToCart} from "../../features/cart/cartAction.js";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CardProduct({product}) {
    const {name, description, price} = product;
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    let userId = null;

    console.log(product);

    if (user) {
        userId = user.id;
    }

    return (<Card>
        <CardBody>
            <Image
                src={"https://via.placeholder.com/600"}
                fallbackSrc={"https://via.placeholder.com/600"}
                alt={`${name} - Product image`}
                borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
                <Heading size="md">{name}</Heading>
                <Text>{description}</Text>
                <Text color="teal.400" fontSize="2xl">
                    {`$ ${price}`}
                </Text>
            </Stack>
        </CardBody>
        <Divider/>
        <CardFooter>
            <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal"
                        onClick={() => (
                            isAuthenticated ? dispatch(addToCart({userId, productId: product.id}))
                                : alert('Please login to add to cart')
                        )}
                >
                    Add to cart
                </Button>
                <Button
                    as={Link}
                    to={`/product/${product.id}`}
                    variant="ghost"
                    colorScheme="teal"
                >
                    View Details
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>);
}

export default CardProduct;
