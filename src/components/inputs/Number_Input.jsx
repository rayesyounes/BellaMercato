import { Button, HStack, Input } from '@chakra-ui/react'
import { useNumberInput } from '@chakra-ui/react'

export default function Number_Input({ handleChange, value }) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: value,
            min: 1,
            max: 50,
            precision: 0,
            onChange: (valueString) => handleChange(Number(valueString)),
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack my={3}>
            <Button {...dec}>-</Button>
            <Input  {...input} w={"50px"} />
            <Button  {...inc}>+</Button>
        </HStack>
    )
}
