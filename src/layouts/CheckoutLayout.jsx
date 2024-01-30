import {Box, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import CheckoutCartCard from "../components/cards/CheckoutCartCard.jsx";
import CheckoutForm from "../components/forms/CheckoutForm.jsx";
import CheckoutCard from "../components/cards/CheckoutCard.jsx";
import CountriesData from "../assets/countries.json";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../features/cart/cartAction.js";
import {addOrderAsync} from "../features/orders/ordersAction.js";
import {decreaseProductStockAsync} from "../features/products/productsAction.js";
import OrderConfirmedCard from "../components/cards/OrderConfirmedCard.jsx";


export default function CheckoutLayout({step, setStep, confirmed, setConfirmed}) {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {items, user_id, total} = useSelector((state) => state.userCart);
    const {orders} = useSelector((state) => state.orders);
    const [countries, setCountries] = useState([]);
    const [data, setData] = useState({
        address: '',
        phone: '',
        emailAddress: '',
        country: '',
        postcode: '',
        state: '',
        city: '',
        notes: '',
        cardName: '' || user.username,
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        orderStatus: '' || 'Processing',
        orderNumber: getOrderNumber(),
        expectedDelivery: getDeliveryDate(),
    });

    useEffect(() => {
        setCountries(CountriesData)
    }, []);

    function getDeliveryDate() {
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const year = deliveryDate.getFullYear();
        const month = String(deliveryDate.getMonth() + 2).padStart(2, '0');
        const day = String(deliveryDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getOrderNumber() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}${month}${day}${orders.length + 1}`;
    }

    function getCurrentDateTime() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    const [order, setOrder] = useState({
        user_id: user.id, products: items, total: total, order_date: getCurrentDateTime(), status: "processing"
    });


    const handelConfirm = () => {
        dispatch(addOrderAsync(order))
        items.map(item => dispatch(decreaseProductStockAsync(item.product_id, item.quantity)))
        dispatch(clearCart(user_id))
        setStep(3)
        setConfirmed(true)
    }

    return (<Box bg={"white"} w={"100%"} px={"5%"} py={5} borderRadius={10}>
        <VStack spacing={6} align="stretch">
            {confirmed ? <OrderConfirmedCard data={data} order={order}/> : (
                <Box>{step === 0 ? <CheckoutCartCard step={step} setStep={setStep}/> : step === 1 ?
                    <CheckoutForm step={step} setStep={setStep} data={data} setData={setData}
                                  countries={countries}/> : step === 2 ?
                        <CheckoutCard step={step} setStep={setStep} data={data} confirmed={confirmed}
                                      handelConfirm={handelConfirm}/> : "confirm order"}</Box>)}
        </VStack>
    </Box>)
}
