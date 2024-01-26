import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserAsync } from "../../features/users/usersAction";
import EditModal from "../modals/EditModal";

const renderHeadData = (col, tag, fontSize, fontWeight, textTransform) => {
    switch (col) {
        case "products":
            return (
                <>
                    <Th fontSize={fontSize} fontWeight={fontWeight}>
                        Product ID
                    </Th>
                    <Th fontSize={fontSize} fontWeight={fontWeight}>
                        Quantity
                    </Th>
                </>
            );
        case "isAdmin":
            return (
                <Th fontSize={fontSize} fontWeight={fontWeight}>
                    Role
                </Th>
            );
        case "id":
            return null;
        default:
            return (
                <Th
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
                        {item[col][0].product_id}
                    </Td>
                    <Td fontSize={"sm"} key={`${col}_quantity`}>
                        {item[col][0].quantity}
                    </Td>
                </>
            );
        case "isAdmin":
            return (
                <Td fontSize={"sm"} key={col}>
                    {renderCellContent(col, item)}
                </Td>
            );
        case "id":
            return null;
        default:
            return (
                <Td fontSize={fontSize} fontWeight={fontWeight}>
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

function DataTable({ columns, data }) {
    const { currentPage } = useSelector((state) => state.page);
    const dispatch = useDispatch();

    const handelDelete = (id) => {
        switch (currentPage) {
            case "users":
                dispatch(deleteUserAsync(id));
                break;
            case "products":
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
                    <Th fontSize={"sm"} fontWeight={"bold"}>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item) => (
                    <Tr key={item.id}>
                        {columns.map((col) =>
                            renderBodyData(col, item, "td", "sm", "normal")
                        )}
                        <Td display={"flex"} justifyContent={"space-evenly"}>
                            <EditModal item={item}/>
                            <IconButton
                                aria-label="Delete"
                                onClick={() => handelDelete(item.id)}
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                size={"sm"}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default DataTable;
