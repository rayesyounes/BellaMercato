import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

export default function OrderCancelled() {
    return (<Alert
            p={8}
            boxShadow="xl"
            status="error"
            variant='subtle'
            borderRadius="md"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"75vh"}
            width={"fit-content"}
        >
            <AlertIcon boxSize="40px" mr={0}/>
            <AlertTitle mt={4} mb={1} fontSize="lg">
                Order Cancelled
            </AlertTitle>
            <AlertDescription maxWidth="sm">
                Your order has been cancelled.<br/> Please contact support for more information.
            </AlertDescription>
        </Alert>);
}