import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Center,
    useDisclosure,
    Button,
} from "@chakra-ui/react";

import {ArrowForwardIcon} from "@chakra-ui/icons";
import AuthLayout from "../../layouts/AuthLayoot.jsx";
import { useState } from "react";

export default function AuthModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [state, setState] = useState(true);

    return (
        <>
            <Button
                size={"sm"}
                variant="solid"
                colorScheme="teal"
                onClick={onOpen}
                rightIcon={<ArrowForwardIcon />}
            >
                Login
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center> {state ? "Login" : "Create your Account"}</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <AuthLayout state={state} onClose={onClose} setState={setState} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
