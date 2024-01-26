import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    IconButton,
    Flex,
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {deleteUserAsync} from "../../features/users/usersAction";
import {deleteProductAsync} from "../../features/products/productsAction";
import EditModal from "../modals/EditModal";
import StatusTag from "../tags/StatusTag";

function DataTable({columns, data}) {
    const {users} = useSelector((state) => state.users);
    const {products} = useSelector((state) => state.products);
    const {currentPage} = useSelector((state) => state.page);
    const dispatch = useDispatch();

    const renderHeadData = (col, tag, fontSize, fontWeight, textTransform) => {
        switch (col) {
            case "products":
                return (
                    <>
                        <Th fontSize={fontSize} fontWeight={fontWeight}>
                            Products
                        </Th>
                        <Th fontSize={fontSize} fontWeight={fontWeight}>
                            Sub Total
                        </Th>
                    </>
                );
            case "isAdmin":
                return (
                    <Th fontSize={fontSize} fontWeight={fontWeight}>
                        Role
                    </Th>
                );
            case "user_id":
                return (
                    <Th fontSize={fontSize} fontWeight={fontWeight}>
                        User
                    </Th>
                );
            case "order_date":
                return (
                    <Th fontSize={fontSize} fontWeight={fontWeight} textAlign={"center"}>
                        Order Date
                    </Th>
                );
            case "id":
                return null;
            default:
                return (
                    <Th
                        textAlign={"center"}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        textTransform={textTransform}
                    >
                        {col}
                    </Th>
                );
        }
    };

    const renderBodyData = (col, item, tag, fontSize, fontWeight) => {
        switch (col) {
            case "products":
                return (
                    <>
                        <Td fontSize={"sm"} key={`${col}_id`}>
                            <Flex flexDirection={"column"}>
                                {item[col].map((i, index) => (
                                    <Box
                                        key={i.id}
                                        p={2}
                                        borderBottom={
                                            index !== item[col].length - 1
                                                ? "1px solid #aaaaaa87"
                                                : "none"
                                        }
                                    >
                                        {getProductName(i.product_id)} -{" "}
                                        {i.quantity}{" "}
                                        {i.quantity > 2 ? "Units" : "Unit"}
                                    </Box>
                                ))}
                            </Flex>
                        </Td>
                        <Td fontSize={"sm"} key={`${col}_quantity`}>
                            {item[col].map((i, index) => (
                                <Box
                                    key={i.id}
                                    p={2}
                                    borderBottom={
                                        index !== item[col].length - 1
                                            ? "1px solid #aaaaaa87"
                                            : "none"
                                    }
                                >
                                    {parseFloat(
                                        getProductPrice(i.product_id) *
                                            i.quantity
                                    ).toFixed(2)}{" "}
                                    $
                                </Box>
                            ))}
                        </Td>
                    </>
                );
            case "user_id":
                return (
                    <Td fontSize={"sm"} key={col}>
                        {getUsername(item[col])}
                    </Td>
                );
            case "isAdmin":
                return (
                    <Td fontSize={"sm"} key={col}>
                        {renderCellContent(col, item)}
                    </Td>
                );
            case "order_date":
                return (
                    <Td fontSize={"sm"} key={col} textAlign={"center"}>
                        {new Date(item[col]).toLocaleDateString()}
                    </Td>
                );
            case "status":
                return (
                    <Td fontSize={"sm"} key={col} textAlign={"center"}>
                        <StatusTag status={item[col]} />
                    </Td>
                );
            case "id":
                return null;
            default:
                return (
                    <Td fontSize={fontSize} fontWeight={fontWeight} textAlign={"center"}>
                        {item[col]}
                    </Td>
                );
        }
    };

    const renderCellContent = (col, item) => {
        switch (col) {
            case "products":
                return null;
            case "isAdmin":
                return item[col] ? "Admin" : "Customer";
            case "id":
                return item[col];
            default:
                return item[col];
        }
    };

    const getUsername = (id) => {
        const user = users.find((user) => user.id === id);
        return user.username;
    };

    const getProductName = (id) => {
        const product = products.find((product) => product.id === id);
        return product.name;
    };

    const getProductPrice = (id) => {
        const product = products.find((product) => product.id === id);
        return product.price;
    }

    const handelDelete = (id) => {
        switch (currentPage) {
            case "users":
                dispatch(deleteUserAsync(id));
                break;
            case "products":
                dispatch(deleteProductAsync(id));
                break;
            case "orders":
                break;
            default:
                break;
        }
    };

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {columns.map((col) =>
                        renderHeadData(col, "th", "sm", "bold", "uppercase")
                    )}
                    <Th fontSize={"sm"} textAlign={"center"} fontWeight={"bold"}>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item) => (
                    <Tr
                        key={item.id}
                    >
                        {columns.map((col) =>
                            renderBodyData(col, item, "td", "sm", "normal")
                        )}
                        <Td border={"none"}>

                            <Flex justifyContent={"center"} gap={2}>
                                <EditModal item={item}/>
                                <IconButton
                                    aria-label="Delete"
                                    onClick={() => handelDelete(item.id)}
                                    icon={<DeleteIcon/>}
                                    colorScheme="red"
                                    size={"sm"}
                                />
                            </Flex>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default DataTable;
