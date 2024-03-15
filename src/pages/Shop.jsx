import {Box, Container, Flex, Grid, HStack, VStack} from "@chakra-ui/react";
import ProductCard from "../components/cards/ProductCard.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NoData from "../assets/NoData.svg";
import {getProductsAsync} from "../features/products/productsAction.js";
import {setCurrentPage} from "../features/page/PageAction.js";
import {motion} from "framer-motion";
import InfoPanel from "../components/panels/InfoPanel.jsx";
import ProductsFilterPanel from "../components/panels/ProductsFilterPanel.jsx";
import {useLocation} from "react-router-dom";
import EmptyCartSvg from "../assets/EmptyCart.svg";

export default function Shop() {

    const MotionGrid = motion(Grid);
    const dispatch = useDispatch();
    const {products, error, isLoading} = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    const location = useLocation()
    const params = new URLSearchParams(location.search);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filterLoading, setFilterLoading] = useState(false);
    const [filters, setFilters] = useState({
        searchTerm: "", minPrice: null, maxPrice: null, categories: [], brands: [], sort: "none", order: "asc"
    })

    const flatCategories = categories.flatMap(category => [{
        ...category, parent: null, type: "category"
    }, ...category.subcategories.map(subcategory => ({...subcategory, parent: category.name, type: "subcategory"}))]);

    const flatBrands = brands.flatMap(brand => [{
        ...brand, parent: null, type: "brand"
    }, ...brand.subbrands.map(subbrand => ({...subbrand, parent: brand.name, type: "subbrand"}))]);

    useEffect(() => {
        dispatch(setCurrentPage("shop"));
        dispatch(getProductsAsync());
        setCategoriesList(categories);
        setBrandsList(brands)
    }, [dispatch]);

    useEffect(() => {
        console.log(filters);
    }, [filters]);


    useEffect(() => {
        const category = params.get("category");
        const brand = params.get("brand");

        if (category) {
            setFilters(prev => ({...prev, categories: [category]}));
        } else if (brand) {
            setFilters(prev => ({...prev, brands: [brand]}));
        } else {
            setFilters({
                searchTerm: "", minPrice: null, maxPrice: null, categories: [], brands: [], sort: "none", order: "asc"
            })
        }
    }, [location]);


    useEffect(() => {
        if (filters) {
            setFilterLoading(true);
            const filtered = products.filter(product => {
                const searchTerm = filters.searchTerm.toLowerCase();
                const inSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
                const inPrice = (filters.minPrice ? product.price >= filters.minPrice : true) && (filters.maxPrice ? product.price <= filters.maxPrice : true);
                const inCategory = filters.categories.length > 0 ? filters.categories.some(category => product.category.includes(category)) : true;
                const inBrand = filters.brands.length > 0 ? filters.brands.some(brand => product.brand.includes(brand)) : true;
                return inSearch && inPrice && inCategory && inBrand;
            });
            setFilteredProducts(filtered);
            const sort = filters.sort;
            const order = filters.order;
            if (sort !== "none") {
                const sorted = filtered.sort((a, b) => {
                    if (sort === "price") {
                        return order === "asc" ? a.price - b.price : b.price - a.price;
                    } else if (sort === "rating") {
                        return order === "asc" ? a.rating - b.rating : b.rating - a.rating;
                    }
                });
                setFilteredProducts(sorted);
            }
            setFilterLoading(false);
        } else {
            setFilteredProducts(products);
        }
    }, [filters]);


    return (

        <Container maxW="container.xxl" my={4}>
            <VStack spacing={4}>
                <InfoPanel filters={filters} setFilters={setFilters}
                           flatCategories={flatCategories}
                           flatBrands={flatBrands}
                />

                <Flex gap={4} width={"100%"}>

                    <ProductsFilterPanel filters={filters} setFilters={setFilters}
                                         flatCategories={flatCategories}
                                         flatBrands={flatBrands}
                                         categoriesList={categoriesList}
                                         brandsList={brandsList}/>

                    {/*{filterLoading ? <Box>Loading ...</Box> : (*/}


                    {filteredProducts.length === 0 ? (<MotionGrid
                            width={"100%"}
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.9}}
                        >
                            <Box
                                bg={"white"}
                                width={"100%"}
                                borderRadius={"lg"}
                                boxShadow={"md"}
                            >
                                <Box textAlign="center" mt={100}>
                                    <Box maxW="250px" mx="auto">
                                        <img
                                            src={NoData}
                                            alt="No Available Products"
                                            width="100%"
                                            style={{borderRadius: "8px"}}
                                        />
                                    </Box>
                                    <Box fontSize="xl" fontWeight="bold" mt={4}>No Available Products</Box>
                                </Box>
                            </Box>
                        </MotionGrid>) : (<MotionGrid
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.9}}
                            templateColumns="repeat(3, 2fr)" alignItems={"start"} gap={4}>
                            {filteredProducts.map((product) => (<ProductCard key={product.id} product={product}/>))}
                        </MotionGrid>)}
                    {/*)}*/}

                </Flex>
            </VStack>
        </Container>

    );

}
