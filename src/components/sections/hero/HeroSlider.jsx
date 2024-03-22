import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Box } from "@chakra-ui/react";
import HeroSlide1 from "./heroSlides/HeroSlide1.jsx";
import HeroSlide2 from "./heroSlides/HeroSlide2.jsx";
import HeroSlide3 from "./heroSlides/HeroSlide3.jsx";

export default function HeroSlider() {
    const slideDuration = 5000;
    const progressBarAnimationDuration = slideDuration - 500;

    return (
        <Box maxW={"99.7vw"}>
            <style>
                {`
               
                .my-slider-progress {
                    position: absolute;
                    top: 65px;
                    z-index: 10;
                    width: 100%;
                    height: 0.2rem; /* Adjust height as needed */
                    background-color: rgba(255, 255, 255, 0.5);
                }
                .my-slider-progress-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: white;
                    opacity: 0.8;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
                    animation: my-slider-progress-bar ${progressBarAnimationDuration}ms linear forwards;
                }
                @keyframes my-slider-progress-bar {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                // .splide__slide.is-active {
                //     width: 100% !important;
                //     transition: width 0.5s ease-in-out;
                // }
                // .splide__slide {
                //     width: 40% !important;
                //     transition: width 0.5s ease-in-out;
                // }
                `}
            </style>
            <Box className="my-slider-progress">
                <Box className="my-slider-progress-bar"></Box>
            </Box>
            <Splide
                onMounted={(splide) => {
                    const progressBar = document.querySelector('.my-slider-progress-bar');
                    splide.on('moved', () => {
                        progressBar.style.animation = 'none';
                        progressBar.offsetHeight;
                        progressBar.style.animation = `my-slider-progress-bar ${progressBarAnimationDuration}ms linear forwards`;
                    });
                }}
                options={{
                    type: 'loop',
                    direction: 'ttb',
                    snap: true,
                    focus: 'center',
                    rewind: true,
                    height: '75vh',
                    autoplay: true,
                    interval: slideDuration,
                    pauseOnHover: false,
                    pagination: false,
                    arrows: false,
                }}
            >
                <SplideSlide>
                    <HeroSlide1/>
                </SplideSlide>
                <SplideSlide>
                    <HeroSlide2/>
                </SplideSlide>
                <SplideSlide>
                    <HeroSlide3/>
                </SplideSlide>
            </Splide>
        </Box>
    );
}
