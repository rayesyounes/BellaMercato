import { Button, HStack, Input } from '@chakra-ui/react'
import { useNumberInput } from '@chakra-ui/react'


export default function Number_Input({inputStyle, ref, name, handelChange}) {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 10,
            min: 1,
            max: 50,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack maxW='320px'>
            <Button  {...inc}>+</Button>
            <Input {...inputStyle} ref={ref} name={name} onChange={handelChange} {...input} />
            <Button {...dec}>-</Button>
        </HStack>
    )
}