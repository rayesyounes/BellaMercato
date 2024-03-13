import {Box, Container, Flex, Grid, HStack, VStack} from "@chakra-ui/react";
import ProductCard from "../components/cards/ProductCard.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsAsync} from "../features/products/productsAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import {motion} from "framer-motion";
import InfoPanel from "../components/panels/InfoPanel.jsx";
import ProductsFilterPanel from "../components/panels/ProductsFilterPanel.jsx";
import {useLocation} from "react-router-dom";

export default function Shop() {

    const MotionBox = motion(Box);
    const dispatch = useDispatch();
    const {products, error, isLoading} = useSelector((state) => state.products);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
        searchTerm: "",
        minPrice: null,
        maxPrice: null,
        category: [],
        brand: [],
        sort: null,
        order: "asc"
    })

    useEffect(() => {
        console.log(filters);
    }, [filters]);


    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const param = (params.get('category') || params.get('brand') || null);


    const [query, setQuery] = useState(() => {
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
            setQuery({category: category});
        } else if (brand) {
            setQuery({brand: brand});
        } else {
            setQuery(null);
        }
    }, [location]);


    useEffect(() => {
        if (query) {
            if (query.category) {
                setFilteredProducts(products.filter((product) => {
                    const productCategories = product.category
                    return productCategories.includes(query.category);

                }));
            } else if (query.brand) {
                setFilteredProducts(products.filter((product) => {
                    const productBrand = product.brand
                    return productBrand.includes(query.brand);
                }));
            }
        } else {
            setFilteredProducts(products);
        }
    }, [query]);


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

        <Container maxW="container.xxl" my={4}>
            <VStack spacing={4}>
                <InfoPanel param={param}/>
                <Flex gap={4}>
                    <ProductsFilterPanel filters={filters} setFilters={setFilters}/>
                    <MotionBox
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.9}}
                    >
                        <Grid templateColumns="repeat(3, 2fr)" alignItems={"start"} gap={4}>
                            {filteredProducts.map((product) => (<ProductCard key={product.id} product={product}/>))}
                        </Grid>
                    </MotionBox>
                </Flex>
            </VStack>
        </Container>

    );

}
