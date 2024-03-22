import {Box, Container, Grid, Link, Text} from "@chakra-ui/react";
import {BiPackage, BiSupport} from "react-icons/bi";
import {FaTruck, FaCreditCard} from "react-icons/fa";
import {Icon} from "@chakra-ui/icons";
import {motion} from "framer-motion";

const FeaturedServices = () => {
    return (<Box as="section" id="featured-services" className="featured-services" py={10}>
        <Container maxW="container.xl">
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}} gap={8}>
                <ServiceItem icon={BiPackage} title="Fast Shipping"
                             description="Get your orders delivered quickly and efficiently."/>
                <ServiceItem icon={FaTruck} title="Free Shipping"
                             description="Enjoy free shipping on all orders over $50."/>
                <ServiceItem icon={FaCreditCard} title="Secure Payments"
                             description="Shop with confidence using our secure payment gateway."/>
                <ServiceItem icon={BiSupport} title="24/7 Customer Support"
                             description="Need assistance? Our support team is available around the clock."/>
            </Grid>
        </Container>
    </Box>);
};

const ServiceItem = ({icon, title, description}) => {
    return (<motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md" transition="all 0.6s ease-in-out">
            <Icon as={icon} fontSize="4xl" color="teal.500" mb={4}/>
            <Text as="h4" fontSize="xl" fontWeight="semibold" mb={2}><Link href="#" textDecoration="none"
                                                                           _hover={{color: "teal.600"}}>{title}</Link></Text>
            <Text color="gray.600">{description}</Text>
        </Box>
    </motion.div>);
};

export default FeaturedServices;
