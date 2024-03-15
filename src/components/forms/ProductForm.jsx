import {useEffect, useRef, useState} from "react";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input,} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {addProductAsync, updateProductAsync,} from "../../features/products/productsAction";

const ProductForm = ({onClose, item}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const stockRef = useRef();

    useEffect(() => {
        if (item) {
            setFormData(item);
            nameRef.current.value = item.name;
            priceRef.current.value = item.price;
            descRef.current.value = item.description;
            stockRef.current.value = item.stock;
        }
    }, [item]);

    const validateForm = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = "name is required";
        }

        if (!formData.price) {
            errors.price = "price is required";
        } else if (formData.price < 0) {
            errors.price = "price must be greater than 0";
        }

        if (!formData.description) {
            errors.description = "description is required";
        } else if (formData.description.length < 10) {
            errors.description = "description must be at least 10 characters";
        }

        if (!formData.stock) {
            errors.stock = "stock is required";
        } else if (formData.stock < 0) {
            errors.stock = "stock must be greater than 0";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (item) {
                dispatch(updateProductAsync(formData.id, formData));
            } else {
                dispatch(addProductAsync(formData));
            }
            onClose();
        }
    };

    return (
        <Box p={0}>
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <FormControl isInvalid={!!formErrors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        ref={nameRef}
                        value={formData.name || ""}
                        placeholder="Enter name"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />
                    <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formErrors.price}>
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        name="price"
                        ref={priceRef}
                        value={formData.price || ""}
                        placeholder="Enter price"
                        onChange={(e) =>
                            setFormData({...formData, price: e.target.value})
                        }
                    />
                    <FormErrorMessage>{formErrors.price}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formErrors.description}>
                    <FormLabel>description</FormLabel>
                    <Input
                        type="text"
                        name="description"
                        ref={descRef}
                        value={formData.description || ""}
                        placeholder="Enter description"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                    <FormErrorMessage>
                        {formErrors.description}
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formErrors.stock}>
                    <FormLabel>Stock</FormLabel>
                    <Input
                        type="text"
                        name="stock"
                        ref={stockRef}
                        value={formData.stock || ""}
                        placeholder="Enter stock"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value,
                            })
                        }
                    />
                    <FormErrorMessage>{formErrors.stock}</FormErrorMessage>
                </FormControl>

                <Flex justifyContent={"space-between"}>
                    <Button
                        colorScheme="teal"
                        mt={4}
                        onClick={handleSubmit}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        flexBasis={"60%"}
                    >
                        Submit
                    </Button>
                    <Button
                        ml={4}
                        mt={4}
                        onClick={() => onClose()}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        flexBasis={"40%"}
                    >
                        Cancel
                    </Button>
                </Flex>
            </motion.div>
        </Box>
    );
};

export default ProductForm;
