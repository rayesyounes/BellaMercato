import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const renderCellContent = (col, item) => {
    switch (col) {
        case "products":

        case "isAdmin":
            return item[col] ? "Admin" : "Customer";
        case "id":
            return item[col];
        default:
            return item[col];
    }
};

function DataTable({ columns, data }) {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {columns.map((col) => (
                        col === "products" ? (
                            <>
                                <Th fontSize={"sm"} fontWeight={"bold"} key={`${col}_id`}>Product ID</Th>
                                <Th fontSize={"sm"} fontWeight={"bold"} key={`${col}_quantity`}>Quantity</Th>
                            </>
                        ) : col === "id" ? null : (
                            <Th fontSize={"sm"} fontWeight={"bold"} key={col}>
                                {col}
                            </Th>
                        )
                    ))}
                    <Th fontSize={"sm"} fontWeight={"bold"}>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item) => (
                    <Tr key={item.id}>
                        {columns.map((col) => (
                            col === "products" ? (
                                <>
                                    <Td fontSize={"sm"} key={`${col}_id`}>{item[col][0].product_id}</Td>
                                    <Td fontSize={"sm"} key={`${col}_quantity`}>{item[col][0].quantity}</Td>
                                </>
                            ) : col === "id" ? null : (
                                <Td fontSize={"sm"} key={col}>
                                    {renderCellContent(col, item)}
                                </Td>
                            )
                        ))}
                        <Td display={"flex"} justifyContent={"space-evenly"}>
                            <IconButton
                                aria-label="Edit user"
                                icon={<EditIcon />}
                                colorScheme="gray"
                                size={"sm"}
                            />
                            <IconButton
                                aria-label="Delete user"
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
