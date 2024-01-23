import { Container, Grid } from "@chakra-ui/react";
import CardProduct from "../components/cards/CardProduct.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../features/products/productsAction.js";

export default function Shop() {
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductsAsync());
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div>
            <Container maxW="container.xxl" my={4}>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
