import { useEffect, useRef, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Box,
    VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredetials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";

const MotionFormControl = motion(FormControl);
const MotionText = motion(Text);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

export default function AnimatedLoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, password]);

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = async (e) => {
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

        try {
            const userData = await login({ user, password }).unwrap();
            dispatch(setCredetials({ ...userData, user }));
            setUser("");
            setPassword("");
            navigate("/admin/dashboard");
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg("No Server Response");
            } else if (err.originalStatus === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.originalStatus === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }

        // Clear any previous errors
        setEmailError(null);
        setPasswordError(null);
    };

    const handleUserInput = (e) => setUser(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form onSubmit={handleSubmit}>
            <Box
                as="p"
                fontSize="2xl"
                mb={5}
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </Box>
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
                        onChange={handleUserInput}
                        value={user}
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
                        onChange={handlePwdInput}
                        value={password}
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

    return content;
}
