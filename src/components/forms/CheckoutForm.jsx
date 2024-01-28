import {useState, useRef, useEffect} from 'react';
import {
    Flex, Box, FormControl, FormLabel, Input, Button, FormErrorMessage, Textarea, VStack,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionBox = motion(Box);

export default function CheckoutForm({step, setStep, data, setData}) {
    const addressRef = useRef();
    const emailRef = useRef();
    // const firstNameRef = useRef();
    // const lastNameRef = useRef();
    // const phoneRef = useRef();
    const postcodeRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();
    const notesRef = useRef();

    const [formData, setFormData] = useState({
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

    useEffect(() => {
        setFormErrors({})
        addressRef.current.value = data.address
        emailRef.current.value = data.emailAddress
        postcodeRef.current.value = data.postcode
        stateRef.current.value = data.state
        cityRef.current.value = data.city
        notesRef.current.value = data.notes
    }, []);

    const inputStyle = {
        bg: "gray.100", focusBorderColor: "teal.500", borderColor: "gray.300",
    }

    const [formErrors, setFormErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        const errors = {};
        const requiredFields = ['address', 'emailAddress','postcode', 'state', 'city'];

        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (!emailRegex.test(formData.emailAddress)) {
            errors.emailAddress = 'Invalid email address';
        }

        return errors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            console.log(formData);
            setData(formData);
            setStep(prevState => prevState + 1);
        } else {
            setFormErrors(errors);
        }
    };

    return (<Flex
        direction="column"
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
    >
        <form>
            <MotionBox
                width="100%"
                p="4"
                borderRadius="lg"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <Flex direction="column" align="start">
                    {/*<Flex direction="row" gap={3} w={"100%"}>*/}
                    {/*    <FormControl mb="4" isInvalid={!!formErrors.firstName}>*/}
                    {/*        <FormLabel>First Name</FormLabel>*/}
                    {/*        <Input type="text" {...inputStyle} placeholder={"Enter First Name"} name="firstName"*/}
                    {/*               ref={firstNameRef}*/}
                    {/*               onChange={handleChange}/>*/}
                    {/*        <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>*/}
                    {/*    </FormControl>*/}

                    {/*    <FormControl mb="4" isInvalid={!!formErrors.lastName}>*/}
                    {/*        <FormLabel>Last Name</FormLabel>*/}
                    {/*        <Input type="text" {...inputStyle} placeholder={"Enter Last Name"} name="lastName"*/}
                    {/*               ref={lastNameRef} onChange={handleChange}/>*/}
                    {/*        <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>*/}
                    {/*    </FormControl>*/}
                    {/*</Flex>*/}

                    <FormControl mb="4" isInvalid={!!formErrors.emailAddress}>
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" {...inputStyle} placeholder={"Enter Email"} name="emailAddress"
                               ref={emailRef} onChange={handleChange}/>
                        <FormErrorMessage>{formErrors.emailAddress}</FormErrorMessage>
                    </FormControl>


                    <Flex direction="row" gap={3} w={"100%"}>
                        <FormControl mb="4" isInvalid={!!formErrors.state}>
                            <FormLabel>State</FormLabel>
                            <Input type="text" {...inputStyle} placeholder={"Enter State"} name="state" ref={stateRef}
                                   onChange={handleChange}/>
                            <FormErrorMessage>{formErrors.state}</FormErrorMessage>
                        </FormControl>

                        <FormControl mb="4" isInvalid={!!formErrors.city}>
                            <FormLabel>City</FormLabel>
                            <Input type="text" {...inputStyle} placeholder={"Enter City"} name="city" ref={cityRef}
                                   onChange={handleChange}/>
                            <FormErrorMessage>{formErrors.city}</FormErrorMessage>
                        </FormControl>

                        <FormControl mb="4" isInvalid={!!formErrors.postcode}>
                            <FormLabel>Postcode/ZIP</FormLabel>
                            <Input type="text" {...inputStyle} placeholder={"Enter Zip Code"} name="postcode"
                                   ref={postcodeRef} onChange={handleChange}/>
                            <FormErrorMessage>{formErrors.postcode}</FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <FormControl mb="4" isInvalid={!!formErrors.address}>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" {...inputStyle} placeholder={"Enter Address"} name="address" ref={addressRef}
                               onChange={handleChange}/>
                        <FormErrorMessage>{formErrors.address}</FormErrorMessage>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Notes</FormLabel>
                        <Textarea name="notes" {...inputStyle} placeholder={"Leave a Note"} ref={notesRef}
                                  onChange={handleChange}/>
                    </FormControl>
                </Flex>
            </MotionBox>


            <VStack align="stretch">
                <Flex
                    direction={"row"}
                    alignItems="center"
                    justifyContent={step <= 0 ? "flex-end" : "space-between"}
                    px="10px"
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
                        onClick={(e) => handleSubmit(e)}
                    >
                        Next
                    </Button>
                </Flex>
            </VStack>
        </form>
    </Flex>);
}
