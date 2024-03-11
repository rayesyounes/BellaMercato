import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Icon, Text, useRadio, useRadioGroup} from "@chakra-ui/react";
import {ArrowForwardIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


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
                _checked={{bg: spec.color, color: spec.textColor}}
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

export default function InfoPanel({product, param}) {

    const navigate = useNavigate();

    const {currentPage} = useSelector((state) => state.page);
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    const [type, setType] = useState(param || null);
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "type", onChange: setType, defaultValue: type
    });

    const group = getRootProps();

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
        position={currentPage === "product" ? "static" : "sticky"}
        top={20}
        zIndex={10}
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
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon fontSize={"lg"} color="gray.500"/>}>
            <BreadcrumbItem>
                <Link to={"/"}>
                    <BreadcrumbLink fontSize={"lg"} href="#" _hover={{ textDecoration: "none", cursor: "pointer" }}>Home</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}>
                    <BreadcrumbLink fontSize={"lg"} href="#" _hover={{ textDecoration: "none", cursor: "pointer" }}>Shop</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link to={"/shop"}>
                    <BreadcrumbLink fontSize={"lg"} href="#" _hover={{ textDecoration: "none", cursor: "pointer" }}>Products</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>

            {currentPage === "product" && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink fontSize={"lg"} href="#" _hover={{ textDecoration: "none", cursor: "pointer" }}>{product?.name}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>


        <Box maxW={"70vw"} bg={"gray.100"} p={2} borderRadius={"lg"}>
            <HStack display={"grid"} gridAutoFlow={"column"} borderRadius="lg" overflowX={"auto"}
                    {...group} css={{'&::-webkit-scrollbar': {display: 'none'}}}>

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
        </Box>
    </Flex>)

}
