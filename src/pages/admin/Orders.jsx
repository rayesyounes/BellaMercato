import {Box, Container, Text, VStack} from "@chakra-ui/react";
import FiltersPanel from "../../components/panels/FiltersPanel";
import DataTable from "../../components/tables/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrdersAsync} from "../../features/orders/ordersAction.js";
import {setCurrentPage} from "../../features/page/PageAction.js";

function Orders() {
    const dispatch = useDispatch();
    const {orders, error, isLoading} = useSelector((state) => state.orders);
    const [filteredData, setFilteredData] = useState(orders);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        dispatch(setCurrentPage("orders"));
        const fetchData = async () => {
            try {
                await dispatch(getOrdersAsync());
                setColumns(Object.keys(orders[0]));
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Container p={4} maxW="container.xxl">
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
                        Orders
                    </Text>

                    <DataTable data={filteredData} columns={columns}/>

                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </Container>
    );
}

export default Orders;
