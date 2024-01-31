import {Box, Container, Flex} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {useEffect, useState} from "react";
import CheckoutStepper from "../components/steppers/CheckoutStepper.jsx";
import CheckoutLayout from "../layouts/CheckoutLayout.jsx";
import {getOrdersAsync} from "../features/orders/ordersAction.js";
import {motion} from "framer-motion";

export default function CheckOut() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    const MotionBox = motion(Box);

    useEffect(() => {
        dispatch(getOrdersAsync())
        dispatch(setCurrentPage("checkout"));
    }, [dispatch]);

    return (
        <Container maxW="container.xxl" minHeight={"lg"} my={4}>
            <Flex
                direction="column"
                alignItems="strech"
                justifyContent="center"
                gap={5}
                p="10px"
            >
                <CheckoutStepper step={step}/>
                {/*The animation is Affecting the CheckoutLayout data state*/}
                {/*<MotionBox*/}
                {/*    initial={{opacity: 0, y: -20}}*/}
                {/*    animate={{opacity: 1, y: 0}}*/}
                {/*    transition={{duration: 0.9}}*/}
                {/*>*/}
                    <CheckoutLayout confirmed={confirmed} setConfirmed={setConfirmed} step={step} setStep={setStep}/>
                {/*</MotionBox>*/}
            </Flex>
        </Container>
    );
}
