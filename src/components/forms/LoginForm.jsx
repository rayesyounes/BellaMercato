import { useRef, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFormControl = motion(FormControl);
const MotionText = motion(Text);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

export default function AnimatedLoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError("Invalid email address");
            return;
        } else {
            setEmailError(null);
        }

        // Simple password validation
        if (passwordRef.current.value.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        } else {
            setPasswordError(null);
        }

        // Clear any previous errors
        setEmailError(null);
        setPasswordError(null);

    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
                <MotionFormControl
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {emailError}
                        </MotionText>
                    )}
                </MotionFormControl>

                <MotionFormControl
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {passwordError}
                        </MotionText>
                    )}
                </MotionFormControl>

                <MotionButton
                    type="submit"
                    colorScheme="teal"
                    mt={4}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    Login
                </MotionButton>
            </VStack>
        </form>
    );
}
