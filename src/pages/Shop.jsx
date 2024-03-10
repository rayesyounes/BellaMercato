import { Box, Container, Grid, VStack } from "@chakra-ui/react";
import ProductCard from "../components/cards/ProductCard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../features/products/productsAction.js";
import { setCurrentPage } from "../features/page/PageAction.js";
import { motion } from "framer-motion";
import InfoPanel from "../components/panels/InfoPanel.jsx";

export default function Shop() {
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.products);
    const MotionBox = motion(Box);

    useEffect(() => {
        dispatch(setCurrentPage("shop"));
        const fetchData = async () => {
            try {
                await dispatch(getProductsAsync());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Container maxW="container.xxl" my={4}>
                <VStack spacing={4}>
                    <InfoPanel />
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <Grid templateColumns="repeat(4, 2fr)" gap={6}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Grid>
                    </MotionBox>
                </VStack>
            </Container>
        </div>
    );
}
