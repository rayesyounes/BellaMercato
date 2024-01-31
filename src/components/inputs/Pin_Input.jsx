import {HStack, PinInput, PinInputField, Spacer} from '@chakra-ui/react';


export default function Pin_Input() {
    return(
        <HStack>
            <PinInput size={"sm"}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <Spacer />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <Spacer />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <Spacer />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
            </PinInput>
        </HStack>
    )
}