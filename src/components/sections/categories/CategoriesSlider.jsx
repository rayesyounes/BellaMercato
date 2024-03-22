import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Box} from "@chakra-ui/react";
import CategorySlide from "./categoriesSlides/CategorySlide.jsx";
import {useSelector} from "react-redux";

export default function CategoriesSlider() {
    const categories = useSelector((state) => state.categories.categories);

    return (<Box maxW={"99.7vw"}>
        <style>
            {`
                .splideCategory .splide__track {
                    padding:2rem;
                }
                 .splideCategory .splide__slide.is-active {
                    width: 60% !important;
                    height: 60vh;
                    transition: width 0.5s ease-in-out;
                }
                .splideCategory .category-description {
                    opacity: 0;
                    position: absolute;
                }
                .splideCategory .splide__slide.is-active .category-description {
                    opacity: 1;
                    position: relative;
                }
                .splideCategory .splide__slide {
                    width: 40% !important;
                    transition: width 0.5s ease-in-out;
                }
                 `}
        </style>
        <Splide
            className={'splideCategory'}
            options={{
                type: 'loop',
                drag: 'free',
                focus: 'center',
                perPage: 2,
                perMove: 1,
                height: '40vh',
                gap: '2rem',
                padding: {
                    left: '5rem', right: '5rem'
                },
                pagination: false,
                arrows: false,
                autoplay: true,
                interval: 3000,
                pauseOnHover: false,
                resetProgress: false,
            }}
        >
            {categories.map((category) => (
                    <SplideSlide key={category.id}>
                        <CategorySlide
                            category={category}
                        />
                    </SplideSlide>
                )
            )}
        </Splide>
    </Box>);
}
