import {Flex} from "@chakra-ui/react";
import FilterForm from "../forms/FilterForm.jsx";

export default function ProductsFilterPanel({filters, setFilters, categoriesList, brandsList, flatCategories, flatBrands}) {
    return (<Flex
        width={"50vh"}
        height={"90vh"}
        position={"sticky"}
        top={20}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        p={4}
        gap={4}
        flexDirection="column"
        overflowY={"scroll"}
    >
        <FilterForm filters={filters} setFilters={setFilters}
                    flatCategories={flatCategories} flatBrands={flatBrands}
                    brandsList={brandsList} categoriesList={categoriesList}
        />
    </Flex>);
}
