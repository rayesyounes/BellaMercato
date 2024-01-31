import {useState, useRef, useEffect} from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Textarea,
    VStack,
    Select,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionBox = motion(Box);

export default function CheckoutForm({step, setStep, data, setData, countries}) {
    const [selectedCountry, setSelectedCountry] = useState('');

    const addressRef = useRef();
    const countryRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const postcodeRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();
    const notesRef = useRef();


    useEffect(() => {
        setFormErrors({})
        addressRef.current.value = data.address
        countryRef.current.value = data.country
        phoneRef.current.value = data.phone
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
    const phoneNumberRegex = /^\d{8,12}$/;

    const validateForm = () => {
        const errors = {};
        const requiredFields = ['address', 'phone', 'country', 'emailAddress', 'postcode', 'state', 'city'];
        requiredFields.forEach((field) => {
            const value = data[field].trim();
            if (!value) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
            if (field === 'phone' && !phoneNumberRegex.test(value)) {
                errors.phone = 'Invalid phone number';
            }
        });
        if (!emailRegex.test(data.emailAddress)) {
            errors.emailAddress = 'Invalid email address';
        }

        return errors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        let formattedValue = value;
        console.log(data)

        if (name === 'phone') {
            formattedValue = value.replace(/[^0-9]/g, '');
        }

        if (name === 'country') {
            const selectedCountryCode = countries.find((country) => country.name === e.target.value);
            setSelectedCountry(selectedCountryCode);
        }
        setData((prevData) => ({...prevData, [name]: formattedValue}));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setData(data);
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

                    <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} w="100%">
                        <FormControl mb="4" isInvalid={!!formErrors.address}>
                            <FormLabel>Address</FormLabel>
                            <Input type="text" {...inputStyle} placeholder={"Enter Address"} name="address"
                                   ref={addressRef}
                                   onChange={handleChange}/>
                            <FormErrorMessage>{formErrors.address}</FormErrorMessage>
                        </FormControl>

                        <FormControl mb="4" isInvalid={!!formErrors.country}>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select Country" {...inputStyle} name="country" ref={countryRef}
                                    onChange={handleChange}>
                                {countries.map((country) => (<option key={country.name} value={country.name}>
                                    {country.name}
                                </option>))}
                            </Select>
                            <FormErrorMessage>{formErrors.country}</FormErrorMessage>
                        </FormControl>
                    </Box>


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


                    <Box display="grid" gridTemplateColumns="2fr 1fr" gap={3} w="100%">
                        <FormControl
                            mb="4"
                            isInvalid={!!formErrors.emailAddress}
                        >
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                {...inputStyle}
                                placeholder="Enter Email"
                                name="emailAddress"
                                ref={emailRef}
                                onChange={handleChange}
                            />
                            <FormErrorMessage>{formErrors.emailAddress}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                            mb="4"
                            isInvalid={!!formErrors.phone}
                        >
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>
                                    {selectedCountry ? selectedCountry.number : "+212"}
                                </InputLeftAddon>

                                <Input
                                    type="number"
                                    {...inputStyle}
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    ref={phoneRef}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
                        </FormControl>
                    </Box>

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
