import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function DataTable({ columns, data }) {

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {columns.map((col) => (
                        <Th fontSize={"sm"} fontWeight={"bold"} key={col}>
                            {col}
                        </Th>
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
                            <Td key={col}>
                                {col === "isAdmin"
                                    ? item[col] === true
                                        ? "Admin"
                                        : "Costumer"
                                    : item[col]}
                            </Td>
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
