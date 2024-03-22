import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useRadio,
    useRadioGroup
} from "@chakra-ui/react";
import {ArrowForwardIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { IoHomeOutline } from "react-icons/io5";

function RadioCard({children, handelClick, spec, ...props}) {
    const {getInputProps, getRadioProps} = useRadio(props);
    const input = getInputProps();
    const checkbox = getRadioProps();

    return (<>
        <Box as={"label"}>
            <input  {...input} style={{maxWidth: '100%', width: '100%', display: "none"}}/>
            <Box
                {...checkbox}
                fontSize="lg"
                cursor="pointer"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                bg={"white"}
                _hover={{bg: spec.color, color: spec.textColor}}
                onClick={handelClick}
                px={4}
                transition="background-color 0.3s, color 0.3s"
            >
                <Flex alignItems="center">
                    <Text fontSize="lg" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        {children
                            .split("-")
                            .join(" ")
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                    </Text>
                    <Icon as={ArrowForwardIcon} ml={2} fontSize="xl"/>
                </Flex>
            </Box>

        </Box>
    </>);
}

export default function InfoPanel({product, filters, setFilters, flatCategories, flatBrands}) {

    const navigate = useNavigate();
    const containerRef = useRef(null);

    const {currentPage} = useSelector((state) => state.page);
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    const [type, setType] = useState(filters?.category || filters?.brand || null);

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "type", defaultValue: type, onChange: setType
    });

    const group = getRootProps();

    useEffect(() => {
        if (currentPage === "shop") {
            setCategoriesList(categories);
            setBrandsList(brands);
        } else if (currentPage === "product" && product) {
            const categoryList = categories.filter((category) => (product.category).includes(category.id));
            const brandList = brands.filter((brand) => (product.brand).includes(brand.id));
            setCategoriesList(categoryList);
            setBrandsList(brandList);
        }
    }, [currentPage]);


    const updateOrderFilters = (e) => {
        setFilters(prev => ({...prev, order: e}));
    };
    const updateSortFilters = (e) => {
        setFilters(prev => ({...prev, sort: e}));
    };


    const scrollLeft = () => {
        containerRef.current.scrollBy({left: -300, behavior: 'smooth'});
    };
    const scrollRight = () => {
        containerRef.current.scrollBy({left: 150, behavior: 'smooth'});
    };


    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const handleScroll = () => {
                setShowLeftScroll(container.scrollLeft > 0);
                setShowRightScroll(container.scrollLeft < container.scrollWidth - container.clientWidth);
            };
            container.addEventListener("scroll", handleScroll);
            handleScroll();
            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [containerRef.current, filters]);


    return (<Flex
        // position={currentPage === "product" ? "sticky" : "static"}
        // top={20}
        // zIndex={10}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        w="100%"
        p={4}
        gap={20}
        alignItems="center"
        justifyContent={"space-between"}
    >
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon fontSize={"lg"} color="gray.500"/>}>
            <BreadcrumbItem>
                <Link to={"/"}>
                    <BreadcrumbLink fontSize={"lg"} href="#"
                                    _hover={{textDecoration: "none", cursor: "pointer"}}>
                        <IoHomeOutline size={20} />
                    </BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={currentPage === "shop" ? null : "/shop"}>
                    <BreadcrumbLink fontSize={"lg"} href="#"
                                    _hover={{textDecoration: "none", cursor: "pointer"}}>Shop</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={currentPage === "shop" ? null : "/shop"}>
                    <BreadcrumbLink fontSize={"lg"} href="#"
                                    _hover={{textDecoration: "none", cursor: "pointer"}}>Products</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            {currentPage === "product" && (<BreadcrumbItem isCurrentPage>
                <BreadcrumbLink fontSize={"lg"} href="#" _hover={{
                    textDecoration: "none", cursor: "pointer"
                }}>{product?.name}</BreadcrumbLink>
            </BreadcrumbItem>)}
        </Breadcrumb>

        <Flex alignItems={"center"} gap={4}>
            <Flex gap={4}>

                {currentPage === "shop" && (filters?.categories.length > 0 || filters?.brands.length > 0) && (
                    <Box bg={"white"} p={2} borderRadius={"lg"} gap={2} alignItems={"center"} display={"flex"}>
                        {showLeftScroll && (<IconButton
                            size="sm"
                            bg={"white"}
                            aria-label='Left'
                            fontSize='20px'
                            fontWeight={"bold"}
                            icon={<ChevronLeftIcon/>}
                            onClick={scrollLeft}
                        />)}


                        <HStack maxW={"55vw"} display={"grid"} gridAutoFlow={"column"} alignItems={"stretch"}
                                borderRadius="lg" overflowX={"auto"}
                                css={{'&::-webkit-scrollbar': {display: 'none'}, 'position': 'relative'}}
                                ref={containerRef}>
                            {filters?.categories.map((catName) => {
                                const category = flatCategories.find(cat => cat.name === catName);
                                return (<Flex key={category.id} gap={2}>
                                    <Tag size="lg" bg={category.color} variant='subtle' color={category.textColor}
                                         borderRadius="lg">
                                        <TagLabel>
                                            <Text fontSize="lg" whiteSpace="nowrap" overflow="hidden"
                                                  textOverflow="ellipsis">
                                                {category.name
                                                    .split("-")
                                                    .join(" ")
                                                    .split(" ")
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(" ")}
                                            </Text>
                                        </TagLabel>
                                        <TagCloseButton ml={2} fontSize="xl" onClick={() => {
                                            setFilters(prev => ({
                                                ...prev, categories: prev.categories.filter(cat => cat !== catName)
                                            }))
                                        }}/>
                                    </Tag>
                                </Flex>)
                            })}
                            {filters?.brands.map((brandName) => {
                                const brand = flatBrands.find(brn => brn.name === brandName);
                                return (<Flex key={brand.id} gap={2}>
                                    <Tag size="lg" bg={brand.color} variant='subtle' color={brand.textColor}
                                         borderRadius="lg">
                                        <TagLabel>
                                            <Text fontSize="lg" whiteSpace="nowrap" overflow="hidden"
                                                  textOverflow="ellipsis">
                                                {brand.name
                                                    .split("-")
                                                    .join(" ")
                                                    .split(" ")
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(" ")}
                                            </Text>
                                        </TagLabel>
                                        <TagCloseButton ml={2} fontSize="xl" onClick={() => {
                                            setFilters(prev => ({
                                                ...prev, brands: prev.brands.filter(brn => brn !== brandName)
                                            }))
                                        }}/>
                                    </Tag>
                                </Flex>)
                            })}
                        </HStack>

                        {showRightScroll && (<IconButton
                            size="sm"
                            bg={"white"}
                            aria-label='Left'
                            fontSize='20px'
                            fontWeight={"bold"}
                            icon={<ChevronRightIcon/>}
                            onClick={scrollRight}
                        />)}
                    </Box>)}

                {currentPage === "product" && (<Box bg={"gray.100"} p={2} borderRadius={"lg"} gap={2} display={"flex"}>

                    <IconButton
                        size="sm"
                        aria-label='Left'
                        fontSize='20px'
                        fontWeight={"bold"}
                        icon={<ChevronLeftIcon/>}
                        onClick={scrollLeft}
                    />

                    <HStack maxW={"55vw"} display={"grid"} gridAutoFlow={"column"} borderRadius="lg"
                            overflowX={"auto"}
                            {...group} css={{'&::-webkit-scrollbar': {display: 'none'}, 'position': 'relative'}}
                            ref={containerRef}>
                        {categoriesList.map((category) => {
                            const radio = getRadioProps({value: category.name});
                            return (<Flex key={category.id} gap={2}>
                                <RadioCard
                                    {...radio}
                                    spec={category}
                                    key={category.id}
                                    handelClick={() => {
                                        setType(category.name);
                                        navigate(category.link);
                                    }}>
                                    {category.name}
                                </RadioCard>

                                {category.subcategories.map((subcategory) => {
                                    const radio = getRadioProps({value: subcategory.name});
                                    return (<RadioCard
                                        {...radio}
                                        spec={subcategory}
                                        key={subcategory.id}
                                        handelClick={() => {
                                            setType(subcategory.name);
                                            navigate(subcategory.link);
                                        }}>
                                        {subcategory.name}
                                    </RadioCard>)
                                })}
                            </Flex>)
                        })}

                        {brandsList.map((brand) => {
                            const radio = getRadioProps({value: brand.name});
                            return (<Flex key={brand.id} gap={2}>
                                <RadioCard
                                    {...radio}
                                    spec={brand}
                                    key={brand.id}
                                    handelClick={() => {
                                        setType(brand.name);
                                        navigate(brand.link);
                                    }}>
                                    {brand.name}
                                </RadioCard>

                                {brand.subbrands.map((subbrand) => {
                                    const radio = getRadioProps({value: subbrand.name});
                                    return (<RadioCard
                                        {...radio}
                                        spec={subbrand}
                                        key={subbrand.id}
                                        handelClick={() => {
                                            setType(subbrand.name);
                                            navigate(subbrand.link);
                                        }}>
                                        {subbrand.name}
                                    </RadioCard>)
                                })}
                            </Flex>)
                        })}
                    </HStack>

                    <IconButton
                        size="sm"
                        aria-label='Right'
                        fontSize='20px'
                        fontWeight={"bold"}
                        icon={<ChevronRightIcon/>}
                        onClick={scrollRight}
                    />
                </Box>)}
            </Flex>

            {currentPage === "shop" && (<Menu isLazy closeOnSelect={false} matchWidth>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon/>}
                    colorScheme='teal'
                    transition='all 0.2s'
                    borderRadius='md'
                    borderWidth='1px'
                    _hover={{bg: 'teal.400'}}
                    _expanded={{bg: 'teal.400'}}
                >
                    Sort Products
                </MenuButton>
                <MenuList minWidth='100%'>
                    <MenuOptionGroup title='Order' type='radio' value={filters?.order}
                                     onChange={(value) => updateOrderFilters(value)}>
                        <MenuItemOption value='asc'>Ascending</MenuItemOption>
                        <MenuItemOption value='desc'>Descending</MenuItemOption>
                    </MenuOptionGroup>
                    <MenuDivider/>
                    <MenuOptionGroup title={"Sort"} type='radio' value={filters?.sort}
                                     onChange={(value) => updateSortFilters(value)}>
                        {/*<MenuItemOption value='none'>None</MenuItemOption>*/}
                        <MenuItemOption value='price'>Price</MenuItemOption>
                        <MenuItemOption value='rating'>Rating</MenuItemOption>
                    </MenuOptionGroup>
                </MenuList>
            </Menu>)}
        </Flex>
    </Flex>)

}
