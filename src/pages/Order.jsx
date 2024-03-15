import {Box, Container, HStack} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import ShippingStepper from "../components/steppers/ShippingStepper.jsx";
import {getOrdersAsync} from "../features/orders/ordersAction.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import setCurrentPage from "../features/page/PageAction.js";
import {motion} from "framer-motion";
import OrderCancelled from "../components/alerts/OrderCancelled.jsx";
import OrderCard from "../components/cards/OrderCard.jsx";

export default function CheckoutConfirmAlert() {
    const MotionBox = motion(Box);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {orders} = useSelector((state) => state.orders);
    const {products} = useSelector((state) => state.products);

    const [order, setOrder] = useState({
        id: null,
        notes: null,
        status: null,
        order_date: null,
        total: 0,
        products: [],
        shipping_address: null,
        billing_address: null,
        shipping_method: null,
        payment_method: null,
        payment_status: null,
        shipping_date: null,
        shipping_cost: 0,
        discount: 0,
        tax: 0,

    });

    useEffect(() => {
        dispatch(setCurrentPage("order"));
        dispatch(getOrdersAsync());
        setOrder(orders.find((order) => parseInt(order.id) === parseInt(id)));
    }, [dispatch, id]);

    console.log(order);

    return (<Container maxW="container.xxl" minHeight={"lg"} my={4}>
        <MotionBox

            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <HStack spacing={4}>

                <OrderCard order={order} products={products}/>

                {order.status === "cancelled" ? <OrderCancelled/> : <ShippingStepper order={order}/>}

            </HStack>
        </MotionBox>
    </Container>);
}
