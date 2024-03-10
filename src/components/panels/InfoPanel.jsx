import {
    Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Icon, Tag, TagLabel, Text
} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getCategoriesByProduct} from "../../features/categories/categoriesAction.js";
import {getBrandsByProduct} from "../../features/brands/brandsAction.js";

export default function InfoPanel({product}) {


    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    useEffect(() => {
        dispatch(getCategoriesByProduct(product));
        dispatch(getBrandsByProduct(product));
    }, [dispatch, product]);


    return (<Flex
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        w="100%"
        p={4}
        gap={4}
        alignItems="center"
        justifyContent="space-between"
    >
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500"/>}>
            <BreadcrumbItem>
                <Link to={"/"}><BreadcrumbLink href="#">Home</BreadcrumbLink></Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}><BreadcrumbLink href="#">Shop</BreadcrumbLink></Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}><BreadcrumbLink href="#">Products</BreadcrumbLink></Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>

        <HStack justify="center" alignItems="center">
            {brands.map((brand) => (<>
                <Tag
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
                    <TagLabel>
                        {brand.name}
                    </TagLabel>
                </Tag>
                {brand.subbrands.map((subbrand) => (<Tag
                    key={subbrand.id}
                    bg={subbrand.color}
                    size="lg"
                    px={2}
                    variant="solid"
                    borderRadius="xl"
                    fontSize="md"
                    pt={1}
                    ml={2}
                >
                    <TagLabel>
                        {subbrand.name}

                    </TagLabel>
                </Tag>))}
            </>))}

            {categories.map((category) => (<>
                <Tag
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
                    <TagLabel>
                        {category.name}
                    </TagLabel>
                </Tag>
                {category.subcategories.map((subcategory) => (<Tag
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
                    <TagLabel>
                        {subcategory.name}
                    </TagLabel>
                </Tag>))}
            </>))}

        </HStack>

    </Flex>);
}
