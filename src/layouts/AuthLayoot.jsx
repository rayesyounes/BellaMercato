import PropTypes from "prop-types";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { Box, Text, VStack } from "@chakra-ui/react";


export default function AuthLayout({ state, setState }) {
    return (
        <Box p={0} m={0}>
            <VStack spacing={6} align="stretch">
                <Box>{state ? <LoginForm /> : <RegisterForm />}</Box>
            </VStack>

            <VStack>
                <Box h={"1.5rem"} my={6}>
                    {state
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <Text
                        as="span"
                        onClick={() => setState(!state)}
                        color="teal"
                        _hover={{ cursor: "pointer", color: "blue.600" }}
                    >
                        {state ? "Sign Up" : "Log In"}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}

AuthLayout.propTypes = {
    state: PropTypes.bool.isRequired,
    setState: PropTypes.func.isRequired,
};
