import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Box} from "@chakra-ui/react";
import HeroSlide1 from "./heroSlides/HeroSlide1.jsx";
import HeroSlide2 from "./heroSlides/HeroSlide2.jsx";
import HeroSlide3 from "./heroSlides/HeroSlide3.jsx";

export default function HeroSlider() {
    const slideDuration = 10000;
    const progressBarAnimationDuration = slideDuration - 500;

    return (
        <Box>
            <style>
                {`
                .my-slider-progress {
                    position: relative;
                    width: 100%;
                    height: 2px; /* Adjust height as needed */
                    background-color: transparent;
                }
                .my-slider-progress-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: teal;
                    animation: my-slider-progress-bar ${progressBarAnimationDuration}ms linear forwards;
                }
                // .splide__pagination {
                //     counter-reset: pagination-num;
                // }
                //
                // .splide__pagination__page:before {
                //      counter-increment: pagination-num;
                //      content: counter( pagination-num );
                // }
                @keyframes my-slider-progress-bar {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                `}
            </style>
            <div className="my-slider-progress">
                <div className="my-slider-progress-bar"></div>
            </div>
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
                    type: 'fade',
                    rewind: true,
                    height: '80vh',
                    autoplay: true,
                    interval: slideDuration,
                    pauseOnHover: false,
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
