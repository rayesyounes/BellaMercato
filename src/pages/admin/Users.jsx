import {useEffect, useState} from "react";
import {Box, Container, Text, VStack} from "@chakra-ui/react";

import DataTable from "../../components/tables/DataTable";
import FiltersPanel from "../../components/panels/FiltersPanel";

import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../features/page/PageAction";
import {getUsersAsync} from "../../features/users/usersAction";

function Users() {
    const dispatch = useDispatch();
    const {users, error, isLoading} = useSelector((state) => state.users);
    const [columns, setColumns] = useState([]);
    const [filteredData, setFilteredData] = useState(users);

    useEffect(() => {
        dispatch(setCurrentPage("users"));
        const fetchData = async () => {
            try {
                await dispatch(getUsersAsync());
                setColumns(Object.keys(users[0]));
            } catch (err) {
                console.error("Error fetching users:", error, err);
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
                        Customers
                    </Text>
                    <DataTable data={users} columns={columns}/>
                    <Box color="teal" p={4}></Box>
                </Box>
            </VStack>
        </Container>
    );
}

export default Users;
