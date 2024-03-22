import Splide from '@splidejs/splide';
import {SplideSlide} from '@splidejs/react-splide';
import {AutoScroll} from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import {Box, List} from "@chakra-ui/react";
import ProductSlide from "./ProductSlides/ProductSlide.jsx";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {getOrdersAsync} from "../../../features/orders/ordersAction.js";
import {getProductsAsync} from "../../../features/products/productsAction.js";
export default function PopularPSlider() {
    const dispatch = useDispatch();
    const {products, loading: productsLoading} = useSelector((state) => state.products);
    const {orders, loading: ordersLoading} = useSelector((state) => state.orders);
    const splideRef = useRef(null);

    useEffect(() => {
        dispatch(getOrdersAsync());
        dispatch(getProductsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (splideRef.current && !productsLoading && !ordersLoading && products.length > 0 && orders.length > 0) {
            new Splide(splideRef.current, {
                type: 'loop',
                drag: 'free',
                focus: 'center',
                padding: {
                    left: '10rem',
                    right: '10rem',
                },
                perPage: 4,
                height: 'fit-content',
                gap: '1rem',
                pagination: false,
                arrows: false,
                autoScroll: {
                    speed: 0.3,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
                pauseOnHover: false,
                pauseOnFocus: false,

            }).mount({AutoScroll});
        }
    }, [productsLoading, ordersLoading, products, orders]);

    if (productsLoading || ordersLoading || products.length === 0 || orders.length === 0) {
        return <div>Loading...</div>;
    }

    const popularProducts = orders.reduce((acc, order) => {
        order.products.forEach(product => {
            if (acc[product.product_id]) {
                acc[product.product_id] += product.quantity;
            } else {
                acc[product.product_id] = product.quantity;
            }
        });
        return acc;
    }, {});
    const sortedProducts = Object.keys(popularProducts).sort((a, b) => popularProducts[b] - popularProducts[a]);
    const popularProductsList = products.filter(product => sortedProducts.includes(product.id));
    const top10 = popularProductsList.slice(0, 10);

    return (
        <Box maxW={"99.7vw"}>
            <style>
                {`
                .splideProduct .splide__track {
                    padding:2rem;
                    box-sizing: border-box;
                }
                 .splideProduct .splide__slide.is-active {
                    transition: width 0.5s ease-in-out;
                }
                .splideProduct .splide__slide {
                    transition: width 0.5s ease-in-out;
                }
                 `}
            </style>
            <Box ref={splideRef} className="splide splideProduct">
                <Box className="splide__track">
                    <List className="splide__list">
                        {
                            top10.map((product) => (
                                <SplideSlide key={product.id}>
                                   <ProductSlide product={product}/>
                                </SplideSlide>
                            ))
                        }
                    </List>
                </Box>
            </Box>
        </Box>
    );
}

