import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Center,
    useDisclosure,
    Button
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddLayout from "../../layouts/AddLayout.jsx";
import { useSelector } from "react-redux";

const renderHeader = (state) => {
    switch (state) {
        case "users":
            return "Add User";
        case "products":
            return "Add Product";
        default:
            return "Add Order";
    }
};

export default function AddModal() {
    const { currentPage } = useSelector((state) => state.page);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme="teal"
                size={"sm"}
                _hover={{ bg: "teal.600" }}
                onClick={onOpen}
            >
                <AddIcon mr={2} />
                Add
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>{renderHeader(currentPage)}</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <AddLayout
                            onClose={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
