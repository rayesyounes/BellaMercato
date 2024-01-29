import {useRef, useState} from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import axios from "axios";

const MotionFormControl = motion(FormControl);
const MotionText = motion(Text);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

export default function Register({setState}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setEmailError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError("Invalid email address");
            return;
        }

        // Check if the email already exists
        try {
            const checkEmailExists = await axios.get(`https://ray-store-data.vercel.app/users?email=${emailRef.current.value}`);
            if (checkEmailExists.data.length > 0) {
                setEmailError("Email already exists");
                return;
            }
        } catch (error) {
            console.error("Error checking email existence:", error);
            setEmailError("An error occurred");
            return;
        }

        // Simple password validation
        if (passwordRef.current.value.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        // Confirm password validation
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        // If the email is unique, proceed with registration
        const data = {
            username: emailRef.current.value.split('@')[0],
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: "",
            isAdmin: false,
        };

        try {
            const response = await axios.post("https://ray-store-data.vercel.app/users", data);
            console.log(response.data);
            setState(true);
        } catch (err) {
            console.error("Error registering user:", err);
            setEmailError("An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
                <MotionFormControl
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3}}
                >
                    <FormLabel>Email</FormLabel>
                    <MotionInput
                        ref={emailRef}
                        type="email"
                        placeholder="Enter your email"
                        isInvalid={!!emailError}
                        variant="flushed"
                    />
                    {emailError && (
                        <MotionText
                            color="red.500"
                            fontSize="sm"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                        >
                            {emailError}
                        </MotionText>
                    )}
                </MotionFormControl>

                <MotionFormControl
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3, delay: 0.2}}
                >
                    <FormLabel>Password</FormLabel>
                    <MotionInput
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter your password"
                        isInvalid={!!passwordError}
                        variant="flushed"
                    />
                    {passwordError && (
                        <MotionText
                            color="red.500"
                            fontSize="sm"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                        >
                            {passwordError}
                        </MotionText>
                    )}
                </MotionFormControl>

                <MotionFormControl
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3, delay: 0.4}}
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <MotionInput
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Confirm your password"
                        isInvalid={!!confirmPasswordError}
                        variant="flushed"
                    />
                    {confirmPasswordError && (
                        <MotionText
                            color="red.500"
                            fontSize="sm"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                        >
                            {confirmPasswordError}
                        </MotionText>
                    )}
                </MotionFormControl>

                <MotionButton
                    type="submit"
                    colorScheme="teal"
                    mt={4}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3, delay: 0.6}}
                    borderRadius="md"
                >
                    Register
                </MotionButton>
            </VStack>
        </form>
    );
}
