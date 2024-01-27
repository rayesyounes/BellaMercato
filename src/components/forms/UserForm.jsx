import { useEffect, useRef, useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Button,
    FormErrorMessage,
    Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
    addUserAsync,
    updateUserAsync,
} from "../../features/users/usersAction";

const UserForm = ({ onClose, item }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();
    const isAdminRef = useRef();

    useEffect(() => {
        if (item) {
            setFormData(item);
            usernameRef.current.value = item.username;
            emailRef.current.value = item.email;
            passwordRef.current.value = item.password;
            addressRef.current.value = item.address;
            isAdminRef.current.checked = item.isAdmin;
        }
    }, [item]);

    const validateForm = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = "Username is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (item) {
                dispatch(updateUserAsync(formData.id, formData));
            } else {
                dispatch(addUserAsync(formData));
            }
            onClose();
        }
    };

    return (
        <Box p={0}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FormControl isInvalid={!!formErrors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        ref={usernameRef}
                        value={formData.username || ""}
                        placeholder="Enter username"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                    />
                    <FormErrorMessage>{formErrors.username}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formErrors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        ref={emailRef}
                        value={formData.email || ""}
                        placeholder="Enter email"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formErrors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="text"
                        name="password"
                        ref={passwordRef}
                        value={formData.password || ""}
                        placeholder="Enter password"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                        type="text"
                        name="address"
                        ref={addressRef}
                        value={formData.address || ""}
                        placeholder="Enter address"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                    />
                </FormControl>

                <Flex my={6} align="center">
                    <Switch
                        ml={2}
                        colorScheme="teal"
                        ref={isAdminRef}
                        isChecked={formData.isAdmin || false}
                        onChange={() =>
                            setFormData({
                                ...formData,
                                isAdmin: !formData.isAdmin,
                            })
                        }
                    />
                    <FormLabel m={0} ml={3}>
                        Is Admin
                    </FormLabel>
                </Flex>
                <Flex justifyContent={"space-between"}>
                    <Button
                        colorScheme="teal"
                        mt={4}
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        flexBasis={"60%"}
                    >
                        Submit
                    </Button>
                    <Button
                        ml={4}
                        mt={4}
                        onClick={() => onClose()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        flexBasis={"40%"}
                    >
                        Cancel
                    </Button>
                </Flex>
            </motion.div>
        </Box>
    );
};

export default UserForm;
