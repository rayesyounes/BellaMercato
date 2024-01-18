import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {loginAuth} from "../../features/auth/authAction.js";
import {useNavigate} from "react-router-dom";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
} from "@chakra-ui/react";

const MotionFormControl = motion(FormControl);
const MotionText = motion(Text);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

export default function AnimatedLoginForm({onClose}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, isAdmin, isLoading, error} = useSelector((state) => state.auth);

    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin) {
                onClose();
                navigate("/admin");
            } else {
                onClose();
                navigate("/");
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError("Invalid email address");
            return;
        } else {
            setEmailError(null);
        }

        if (passwordRef.current.value.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        } else {
            setPasswordError(null);
        }

        const authCredential = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        dispatch(loginAuth(authCredential));
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

                <MotionButton
                    type="submit"
                    colorScheme="teal"
                    mt={4}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3, delay: 0.4}}
                >
                    Login
                </MotionButton>
            </VStack>
        </form>
    );
}