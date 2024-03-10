import {
    Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Icon, Tag, TagLabel, Text
} from "@chakra-ui/react";
import {ArrowForwardIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function InfoPanel({product}) {
    const {currentPage} = useSelector((state) => state.page);
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    useEffect(() => {
        if (currentPage === "shop") {
            setCategoriesList(categories);
            setBrandsList(brands);
        } else if (currentPage === "product" && product) {
            const categoryList = categories.filter((category) => (product.category).includes(category.id));
            const brandList = brands.filter((brand) => product.brand === brand.id);
            setCategoriesList(categoryList);
            setBrandsList(brandList);
        }
    }, [currentPage]);


    return (<Flex
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        w="100%"
        p={4}
        gap={20}
        alignItems="center"
        justifyContent="space-between"
    >
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
            <BreadcrumbItem>
                <Link to={"/"}>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}>
                    <BreadcrumbLink href="#">Shop</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}>
                    <BreadcrumbLink href="#">Products</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            {currentPage === "product" && (<BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{product?.name}</BreadcrumbLink>
            </BreadcrumbItem>)}
        </Breadcrumb>

        <HStack maxW={"70vw"}>
            <Box display={"grid"} gridAutoFlow={"column"} overflowX={"auto"} css={{
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                {categoriesList.map((category) => (<>
                    <Box
                        as={Link}
                        to={`/shop?category=${category.name}`}
                        bg={category.color}
                        key={category.id}
                        size="lg"
                        px={2}
                        variant="solid"
                        borderRadius="xl"
                        fontSize="md"
                        pt={1}
                        ml={2}
                    >
                        <Flex color={category.textColor} style={{whiteSpace: "nowrap", overflow: "hidden"}}>
                            {category.name.toUpperCase()}
                            <Icon as={ArrowForwardIcon} ml={2} mb={1} fontSize={"xl"}/>
                        </Flex>
                    </Box>
                    {category.subcategories.map((subcategory) => (<Box
                        as={Link}
                        to={`/shop?subcategory=${subcategory.name}`}
                        key={subcategory.id}
                        bg={subcategory.color}
                        size="lg"
                        px={2}
                        variant="solid"
                        borderRadius="xl"
                        fontSize="md"
                        pt={1}
                        ml={2}
                    >
                        <Flex color={subcategory.textColor} style={{whiteSpace: "nowrap", overflow: "hidden"}}>
                            {subcategory.name.toUpperCase()}
                            <Icon as={ArrowForwardIcon} ml={2} mb={1} fontSize={"xl"}/>
                        </Flex>
                    </Box>))}
                </>))}
                {brandsList.map((brand) => (<>
                    <Box
                        as={Link}
                        to={`/shop?brand=${brand.name}`}
                        bg={brand.color}
                        key={brand.id}
                        size="lg"
                        px={2}
                        variant="solid"
                        borderRadius="xl"
                        fontSize="md"
                        pt={1}
                        ml={2}
                    >
                        <Flex color={brand.textColor}  style={{whiteSpace: "nowrap", overflow: "hidden"}}>
                            <Text>
                                {brand.name.toUpperCase()}
                            </Text>
                            <Icon as={ArrowForwardIcon} ml={2} mb={1}fontSize={"xl"}/>
                        </Flex>
                    </Box>
                    {brand.subbrands.map((subbrand) => (<Box
                        as={Link}
                        key={subbrand.id}
                        to={`/shop?subbrand=${subbrand.name}`}
                        bg={subbrand.color}
                        size="lg"
                        px={2}
                        variant="solid"
                        borderRadius="xl"
                        fontSize="md"
                        pt={1}
                        ml={2}
                    >
                        <Flex color={subbrand.textColor}  style={{whiteSpace: "nowrap", overflow: "hidden"}}>
                            {subbrand.name.toUpperCase()}
                            <Icon as={ArrowForwardIcon} ml={2} mb={1} fontSize={"xl"}/>
                        </Flex>
                    </Box>))}
                </>))}
            </Box>
        </HStack>
    </Flex>);
}
