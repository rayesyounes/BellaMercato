import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {loginAuth, resetErors} from "../../features/auth/authAction.js";
import {useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

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

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin) {
                onClose();
                navigate('/admin/dashboard');
            } else {
                onClose();
                navigate('/');
            }
        } else if (error) {
            setPasswordError(null);
            setPasswordError(error);
            dispatch(resetErors());
        }
    }, [isAuthenticated, isAdmin, isLoading, error, onClose, navigate, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(null);
        setPasswordError(null);

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
            email: emailRef.current.value, password: passwordRef.current.value
        };

        dispatch(loginAuth(authCredential));

    };

    return (<form onSubmit={handleSubmit}>
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
                    focusBorderColor="teal.400"
                />
                {emailError && (<MotionText
                    color="red.500"
                    fontSize="sm"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    {emailError}
                </MotionText>)}
            </MotionFormControl>

            <MotionFormControl
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3, delay: 0.2}}
            >
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <MotionInput
                        ref={passwordRef}
                        type={show ? 'text' : 'password'}
                        placeholder="Enter your password"
                        isInvalid={!!passwordError}
                        variant="flushed"
                        focusBorderColor="teal.400"
                    />
                    <InputRightElement width='4.5rem'>
                        {/*<Button variant="ghost" h='1.75rem' size='sm' onClick={handleClick}>*/}
                        {/*    {show ? 'Hide' : 'Show'}*/}
                        {/*</Button>*/}
                        <Icon
                            as={show ? ViewOffIcon : ViewIcon}
                            color='teal.600'
                            onClick={handleClick}
                            cursor='pointer'
                        />
                    </InputRightElement>
                </InputGroup>
                {passwordError && (<MotionText
                    color="red.500"
                    fontSize="sm"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    {passwordError}
                </MotionText>)}
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
    </ form>);
}