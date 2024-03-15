import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps
} from "@chakra-ui/react";
import {useEffect} from "react";

const steps = [
    {title: "My Cart", description: "Select Products"},
    {title: "Billing Info", description: "Enter Contact Info"},
    // {title: "Payment", description: "Date & Time"},
    {title: "Confirmation", description: "Confirm Order"},
];

function CheckoutStepper({step}) {

    useEffect(() => {
        if (step <= 3 && step >= 0) {
            console.log(step)
            setActiveStep(step)
        }
    }, [step]);

    const {activeStep, setActiveStep} = useSteps({
        index: 1, count: steps.length,
    });

    return (<Stepper
        index={activeStep}
        colorScheme={"teal"}
        borderRadius={10}
        flexWrap={"wrap"}
        bg={"white"}
        px={"8%"}
        size="md"
        py={5}
    >
        {steps.map((step, index) => (<Step key={index}>
            <StepIndicator>
                <StepStatus
                    complete={<StepIcon/>}
                    incomplete={<StepNumber/>}
                    active={<StepNumber/>}
                />
            </StepIndicator>

            <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator/>
        </Step>))}
    </Stepper>);
}

export default CheckoutStepper;
