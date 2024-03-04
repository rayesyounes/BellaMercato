import {
    Box, Step, StepDescription, Stepper, StepIndicator, StepStatus, StepTitle, StepSeparator, useSteps, Icon
} from "@chakra-ui/react";
import {useEffect} from "react";
import {FaHourglass, FaCheck, FaPlane, FaBox} from "react-icons/fa";


export default function ShippingStepper({order}) {

    const steps = [{title: "Processing", icon: FaHourglass}, {title: "Confirmed", icon: FaCheck}, {
        title: "Shipped",
        icon: FaPlane
    }, {title: "Delivered", icon: FaBox}];

    useEffect(() => {
        switch (order.status) {
            case "processing":
                setActiveStep(1);
                break;
            case "confirmed":
                setActiveStep(2);
                break;
            case "shipped":
                setActiveStep(3);
                break;
            case "delivered":
                setActiveStep(4);
                break;
            default:
                setActiveStep(0);
        }
    }, [order.status]);

    const {activeStep, setActiveStep} = useSteps({
        index: 1, count: steps.length,
    });

    return (<Stepper
        orientation='vertical'
        index={activeStep}
        boxShadow="xl"
        colorScheme={order.status === "processing" ? "orange" : order.status === "confirmed" ? "blue" : order.status === "cancelled" ? "red" : order.status === "delivered" ? "green" : order.status === "shipped" ? "purple" : "gray"}
        borderRadius={10}
        bg={"white"}
        size="md"
        height={"75vh"}
        p={8}
    >
        {steps.map((step, index) => (<Step key={index}>
            <StepIndicator>
                <StepStatus
                    complete={<Icon as={step.icon}/>}
                    incomplete={<Icon as={step.icon}/>}
                    active={<Icon as={step.icon}/>}
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
