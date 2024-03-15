import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {Box, Container, Image,} from "@chakra-ui/react";
import HeroSection from "./sections/hero/HeroSection.jsx";
import BannerTop from "../assets/bannerTop.svg";
import BannerBottom from "../assets/bannerBottom.svg";
import HeroSlider from "./sections/hero/HeroSlider.jsx";

export default function Home() {
    const dispatch = useDispatch();
    const {currentPage} = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("home"));
    }, [dispatch]);

    return (<Container maxW="container.xxl" px={0} minHeight={"lg"} my={0}>

        <section>
            <HeroSection/>
            <Box><Image src={BannerTop} alt="BanerTop"/></Box>
        </section>




        <section>
            <Box maxW={"99vw"}>

                <HeroSlider/>
            </Box>
        </section>




        <section>
            <Image src={BannerBottom} alt="BanerBottom"/>
        </section>
    </Container>);
}