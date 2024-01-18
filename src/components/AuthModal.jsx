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

import AuthLayoot from "../layouts/AuthLayoot";
import { useState } from "react";

export default function ModalComponent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [state, setState] = useState(true);

    return (
        <>
            <Button
                size={"sm"}
                variant="solid"
                colorScheme="teal"
                onClick={onOpen}
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
                        <AuthLayoot state={state} onClose={onClose} setState={setState} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
