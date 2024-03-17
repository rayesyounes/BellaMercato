import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {Box, Container, Image,} from "@chakra-ui/react";
import HeroSection from "../components/sections/hero/HeroSection.jsx";
import BannerTop from "../assets/BannerTop.svg";
import BannerBottom from "../assets/BannerBottom.svg";

export default function Home() {
    const dispatch = useDispatch();
    const {currentPage} = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("home"));
    }, [dispatch]);

    return (<Container minW="container.xxl" maxW="100%"  px={0} minHeight={"lg"} my={0}>

        <section>
            <HeroSection/>
            <Box><Image src={BannerTop} alt="BanerTop"/></Box>
        </section>




        <section>

        </section>




        <section>
            <Image src={BannerBottom} alt="BanerBottom"/>
        </section>
    </Container>);
}