import {Box, Container, Grid, VStack} from "@chakra-ui/react";
import ProductCard from "../components/cards/ProductCard.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsAsync} from "../features/products/productsAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import {motion} from "framer-motion";
import InfoPanel from "../components/panels/InfoPanel.jsx";
import {useLocation} from "react-router-dom";

export default function Shop() {

    const MotionBox = motion(Box);
    const dispatch = useDispatch();
    const {products, error, isLoading} = useSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const param = (params.get('category') || params.get('brand') || null);


    const [filter, setFilter] = useState(() => {
        const category = params.get("category");
        const brand = params.get("brand");

        if (category) {
            return {category: category};
        } else if (brand) {
            return {brand: brand};
        } else {
            return null;
        }
    });

    useEffect(() => {
        const category = params.get("category");
        const brand = params.get("brand");

        if (category) {
            setFilter({category: category});
        } else if (brand) {
            setFilter({brand: brand});
        } else {
            setFilter(null);
        }
    }, [location]);


    useEffect(() => {
        if (filter) {
            if (filter.category) {
                setFilteredProducts(products.filter((product) => {
                    const productCategories = product.category
                    return productCategories.includes(filter.category);

                }));
            } else if (filter.brand) {
                setFilteredProducts(products.filter((product) => {
                    const productBrand = product.brand
                    return productBrand.includes(filter.brand);
                }));
            }
        } else {
            setFilteredProducts(products);
        }
    }, [filter]);


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

    return (<div>
            <Container maxW="container.xxl" my={4}>
                <VStack spacing={4}>
                    <InfoPanel param={param}/>
                    <MotionBox
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.9}}
                    >
                        <Grid templateColumns="repeat(4, 2fr)" gap={6}>
                            {filteredProducts.map((product) => (<ProductCard key={product.id} product={product}/>))}
                        </Grid>
                    </MotionBox>
                </VStack>
            </Container>
        </div>);
}
