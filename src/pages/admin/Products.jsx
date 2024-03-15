import {Box, Container, Text, VStack} from "@chakra-ui/react";
import FiltersPanel from "../../components/panels/FiltersPanel";
import DataTable from "../../components/tables/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProductsAsync,} from "../../features/products/productsAction.js";
import {setCurrentPage} from "../../features/page/PageAction.js";

function Products() {
    const dispatch = useDispatch();
    const {products, error, isLoading} = useSelector((state) => state.products);
    const [columns, setColumns] = useState([]);
    const [filteredData, setFilteredData] = useState(products);

    useEffect(() => {
        dispatch(setCurrentPage("products"));
        const fetchData = async () => {
            try {
                await dispatch(getProductsAsync());
                setColumns(Object.keys(products[0]));
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (<Container p={4} maxW="container.xxl">
        <VStack spacing={4}>
            <FiltersPanel setFilteredData={setFilteredData}/>

            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                w="100%"
            >
                <Text
                    bg="White"
                    color="teal"
                    fontSize={20}
                    fontWeight="bold"
                    p={4}
                >
                    Products
                </Text>

                <DataTable data={products} columns={columns}/>

                <Box color="teal" p={4}></Box>
            </Box>
        </VStack>
    </Container>);
}

export default Products;
