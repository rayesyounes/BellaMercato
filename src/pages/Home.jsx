import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {Box, Container, Image, Spacer,} from "@chakra-ui/react";
import HeroSection from "../components/sections/hero/HeroSection.jsx";
import BannerTop from "../assets/BannerTop.svg";
import BannerBottom from "../assets/BannerBottom.svg";
import BannerMiddleBottom from "../assets/BannerMiddleBottom.svg";
import BannerMiddleTop from "../assets/BannerMiddleTop.svg";
import Newsletter from "../components/sections/newsletter/NewsletterSection.jsx";
import CategoriesSlider from "../components/sections/categories/CategoriesSlider.jsx";
import PopularPSection from "../components/sections/popularProducts/PopularPSection.jsx";
import ScrollToTop from "../components/buttons/ScrollTopButton.jsx";
import FeaturedServices from "../components/sections/featuredServices/FeaturedServices.jsx";
import AboutSection from "../components/sections/about/AboutSection.jsx";
import CategoriesSection from "../components/sections/categories/CategoriesSection.jsx";

export default function Home() {
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
        dispatch(setCurrentPage("home"));
    }, [dispatch]);

    return (<Container minW="container.xxl" maxW="100%" px={0} minHeight={"lg"} my={0}>

        <Box>
            <HeroSection/>
            <Box position={"absolute"}
                 top={"60vh"}
                 left={0}
                 right={0}
                 zIndex={5}
                 bg={"transparent"}
            >
                <FeaturedServices/>
            </Box>
        </Box>
        <Box>
            <PopularPSection/>
            <CategoriesSection/>
        </Box>
        <Box bg={"teal.50"}>
            <Box id="about">
                <AboutSection/>
            </Box>
            <Newsletter/>
            <Image src={BannerBottom} alt="BanerBottom"/>
        </Box>

        <ScrollToTop/>
    </Container>);
}