import {
    CardFooter,
    CardBody,
    Divider,
    Image,
    Stack,
    Heading,
    Text,
    ButtonGroup,
    Button,
    Card,
} from "@chakra-ui/react";

function CardProduct({ product }) {
    const { name, description, price } = product;

    return (
        <Card>
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
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="teal">
                        Add to cart
                    </Button>
                    <Button variant="ghost" colorScheme="teal">
                        View details
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default CardProduct;
