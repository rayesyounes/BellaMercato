import {
    Flex,
    Button,
    FormControl,
    FormLabel,
    RangeSlider,
    Box,
    RangeSliderTrack,
    RangeSliderThumb,
    RangeSliderFilledTrack,
    Tooltip,
    CheckboxGroup,
    Stack,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Input,
} from "@chakra-ui/react";
import {MdGraphicEq} from "react-icons/md";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


export default function FilterForm({filters, setFilters}) {
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    useEffect(() => {
        setCategoriesList(categories);
        setBrandsList(brands)
    }, []);

    const handleSliderChange = (values) => {
        const [min, max] = values;
        setFilters(prev => ({
            ...prev,
            minPrice: min === 0 ? null : Math.round((min / 100) * 1500),
            maxPrice: max === 100 ? null : Math.round((max / 100) * 1500),
        }))
    };

    const updateCategoriesFilters = (e) => {
        if (e.target.checked) {
            setFilters(prev => ({...prev, category: [...prev.category, e.target.value]}))
        } else {
            setFilters(prev => ({...prev, category: prev.category.filter((cat) => cat !== e.target.value)}))
        }
    }

    const updateBrandsFilters = (e) => {
        if (e.target.checked) {
            setFilters(prev => ({...prev, brand: [...prev.brand, e.target.value]}))
        } else {
            setFilters(prev => ({...prev, brand: prev.brand.filter((cat) => cat !== e.target.value)}))
        }
    }

    const handelClear = () => {
        setFilters({
            searchTerm: "",
            minPrice: null,
            maxPrice: null,
            category: [],
            brand: [],
            sort: "none",
            order: "asc"
        })
    }


    return (<Flex gap={4} flexDirection="column">

        <FormControl>
            <Input
                variant="filled"
                focusBorderColor="teal.500"
                value={filters?.searchTerm}
                onChange={(e) => {
                    setFilters(prev => ({...prev, searchTerm: e.target.value}));
                }}
                placeholder="Search for ..."
            />
        </FormControl>

        <FormControl>

            <FormLabel>Price Range</FormLabel>
            <Flex px={4} mb={8}>
                <RangeSlider
                    step={10}
                    aria-label="Price Range"
                    value={
                        [filters.minPrice === null ? 0 : (filters.minPrice / 1500) * 100,
                            filters.maxPrice === null ? 100 : (filters.maxPrice / 1500) * 100]
                    }
                    onChange={handleSliderChange}
                    colorScheme="teal"
                >
                    <RangeSliderTrack bg="gray.200">
                        <RangeSliderFilledTrack bg="teal"/>
                    </RangeSliderTrack>
                    <Tooltip isOpen label={filters.minPrice !== null ? `$${filters.minPrice}` : "$0"}
                             placement="bottom" hasArrow={true}
                             bg="white" color="teal" borderRadius={4} boxShadow={"md"}
                             zIndex={-1}

                    >
                        <RangeSliderThumb boxSize={6} index={0}>
                            <Box color="teal" as={MdGraphicEq}/>
                        </RangeSliderThumb>
                    </Tooltip>
                    <Tooltip isOpen label={filters.maxPrice !== null ? `$${filters.maxPrice}` : "+$1500"}
                             placement={filters.maxPrice === null ? "bottom-end" : "bottom"} hasArrow={true}
                             bg="white" color="teal" borderRadius={4} boxShadow={"md"}
                    >
                        <RangeSliderThumb boxSize={6} index={1}>
                            <Box color="teal" as={MdGraphicEq}/>
                        </RangeSliderThumb>
                    </Tooltip>
                </RangeSlider>
            </Flex>
        </FormControl>

        <FormControl>
            <FormLabel>Categories</FormLabel>
            <CheckboxGroup colorScheme='teal' value={filters.category}>
                {categoriesList.map((category) => (

                    <Accordion key={category.id} allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {category.name}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Stack spacing={[1, 3]} direction={['column', 'column']}>
                                    {category.subcategories.map((subcategory) => (
                                        <Checkbox
                                            onChange={(e) => updateCategoriesFilters(e)}
                                            key={subcategory.id} value={subcategory.name}>{subcategory.name}</Checkbox>
                                    ))}
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                ))}
            </CheckboxGroup>
        </FormControl>

        <FormControl>
            <FormLabel>Brands</FormLabel>
            <CheckboxGroup colorScheme='teal' value={filters.brand}>
                {brandsList.map((brand) => (

                    <Accordion key={brand.id} allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {brand.name}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Stack spacing={[1, 3]} direction={['column', 'column']}>
                                    {brand.subbrands.map((subbrand) => (
                                        <Checkbox
                                            onChange={(e) => updateBrandsFilters(e)}
                                            key={subbrand.id} value={subbrand.name}>{subbrand.name}</Checkbox>
                                    ))}
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                ))}
            </CheckboxGroup>
        </FormControl>


        <Button colorScheme="teal" variant={"outline"} onClick={handelClear}>Clear Filters</Button>
    </Flex>);
}
