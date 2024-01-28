import {Box, VStack, Flex, Button} from "@chakra-ui/react";
import {useState} from "react";
import CheckoutCartCard from "../components/cards/CheckoutCartCard.jsx";
import CheckoutForm from "../components/forms/CheckoutForm.jsx";
import CheckoutCard from "../components/cards/CheckoutCard.jsx";

export default function CheckoutLayout({step, setStep}) {

    const [confirmed, setConfirmed] = useState(false);
    const [data, setData] = useState({
        address: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        postcode: '',
        state: '',
        city: '',
        phone: '',
        notes: '',
    });


    const handelConfirm = () => {
        setStep(3)
        alert("Confirmed")
        setConfirmed(true)
    }

    return (<Box bg={"white"} w={"100%"} px={"5%"} py={5} borderRadius={10}>
        <VStack spacing={6} align="stretch">
            {confirmed ? <Box>Order Recieved</Box> : (
                <Box>{step === 0 ? <CheckoutCartCard step={step} setStep={setStep}/> : step === 1 ?
                    <CheckoutForm step={step} setStep={setStep} data={data} setData={setData}/> : step === 2 ?
                        <CheckoutCard step={step} setStep={setStep} data={data} confirmed={confirmed}
                                      handelConfirm={handelConfirm}/> : "confirm order"}</Box>)}
        </VStack>
    </Box>)
}
