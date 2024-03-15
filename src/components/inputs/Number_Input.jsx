import { Button, HStack, Input } from '@chakra-ui/react'
import { useNumberInput } from '@chakra-ui/react'

export default function Number_Input({ handleChange, value, max }) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue:  max > value ? value : max,
            min: 1,
            max: max,
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
