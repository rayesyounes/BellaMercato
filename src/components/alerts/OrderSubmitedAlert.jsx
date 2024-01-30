import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

export default function CheckoutLayout({status}) {
    return (<Alert
        status={status}
        variant='subtle'
        borderRadius="md"
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        px={"8%"}
        size="md"
        py={5}
    >
        <AlertIcon boxSize='40px' mr={0}/>
        <AlertTitle mt={4} mb={1} fontSize='lg'>
            Order Received!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
            Thanks for submitting your order <br/>Our team will get back to you soon.
        </AlertDescription>
    </Alert>)
}