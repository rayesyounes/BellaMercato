import {Flex} from "@chakra-ui/react";
import FilterForm from "../forms/FilterForm.jsx";

export default function ProductsFilterPanel({filters, setFilters}) {
    return (<Flex
            position={"sticky"}
            top={20}
            width={"50vh"}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            p={4}
            gap={4}
            flexDirection="column"
        >
            <FilterForm filters={filters} setFilters={setFilters}/>
        </Flex>);
}
