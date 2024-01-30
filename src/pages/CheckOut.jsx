import {Container, Flex} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {useEffect, useState} from "react";
import CheckoutStepper from "../components/steppers/CheckoutStepper.jsx";
import CheckoutLayout from "../layouts/CheckoutLayout.jsx";
import {getOrdersAsync} from "../features/orders/ordersAction.js";

export default function CheckOut() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        dispatch(getOrdersAsync())
        dispatch(setCurrentPage("checkout"));
    }, [dispatch]);

    return (
        <Container maxW="container.xxl" minHeight={"lg"} my={4} >
            <Flex
                direction="column"
                alignItems="strech"
                justifyContent="center"
                gap={5}
                p="10px"
            >
                <CheckoutStepper step={step}/>
                <CheckoutLayout confirmed={confirmed} setConfirmed={setConfirmed} step={step} setStep={setStep}/>
            </Flex>
        </Container>
    );
}
