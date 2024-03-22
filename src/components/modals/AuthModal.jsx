import {
    Button,
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";

import {ArrowForwardIcon} from "@chakra-ui/icons";
import AuthLayout from "../../layouts/AuthLayoot.jsx";
import {useState} from "react";

export default function AuthModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [state, setState] = useState(true);

    return (
        <>
            <Button
                size={"md"}
                variant="solid"
                colorScheme="teal"
                onClick={onOpen}
                rightIcon={<ArrowForwardIcon/>}
            >
                Login
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
                <ModalOverlay
                    // bgGradient="linear(to-t, rgba(48, 140, 122, 0.8), rgba(48, 140, 122, 0.4))"
                />
                <ModalContent>
                    <ModalHeader>
                        <Center> {state ? "Login" : "Create your Account"}</Center>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <AuthLayout state={state} onClose={onClose} setState={setState}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
