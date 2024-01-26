import { Box, VStack } from "@chakra-ui/react";
import UserForm from "../components/forms/UserForm.jsx";
import ProductForm from "../components/forms/ProductForm.jsx";
import { useSelector } from "react-redux";

export default function AddLayout({ onClose }) {
    const { currentPage } = useSelector((state) => state.page);
    const renderForm = (state) => {
        switch (state) {
            case "users":
                return <UserForm onClose={onClose} />;
            case "products":
                return <ProductForm onClose={onClose} />;
            case "orders":
                return null;
            default:
                return null;
        }
    };
    
    return (
        <Box p={0} m={0}>
            <VStack spacing={6} align="stretch">
                <Box>{renderForm(currentPage)}</Box>
            </VStack>
        </Box>
    );
}
