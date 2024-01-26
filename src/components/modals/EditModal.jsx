import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Center,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import EditLayout from "../../layouts/EditLayout.jsx";
import { useSelector } from "react-redux";
import { EditIcon } from "@chakra-ui/icons";

const renderHeader = (state) => {
    switch (state) {
        case "users":
            return "Update User";
        case "products":
            return "Update Product";
        default:
            return "Update Order";
    }
};

export default function EditModal({ item }) {
    const { currentPage } = useSelector((state) => state.page);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                colorScheme="gray"
                size={"sm"}
                _hover={{ bg: "gray.600", color: "white"}}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>{renderHeader(currentPage)}</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <EditLayout onClose={onClose} item={item} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
