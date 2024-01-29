import {Button, Flex, VStack} from "@chakra-ui/react";

export default function CheckoutCard({step, confirmed, handelConfirm, setStep}) {
    return (<Flex direction="column">

            <VStack align="stretch">
                <Flex
                    direction={"row"}
                    alignItems="center"
                    justifyContent={step <= 0 ? "flex-end" : "space-between"}
                >
                    <Button
                        colorScheme="gray"
                        variant={"solid"}
                        size="md"
                        onClick={() => setStep(prevState => prevState - 1)}
                    >
                        Back
                    </Button>

                    <Button
                        colorScheme="teal"
                        size="md"
                        onClick={() => handelConfirm()}
                    >
                        Confirm
                    </Button>
                </Flex>
            </VStack>
        </Flex>)
}