import {
    addProductFailure,
    addProductStart,
    addProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductsFailure,
    getProductsStart,
    getProductsSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
} from "./productsSlice";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getProductsAsync = () => async (dispatch) => {
    try {
        dispatch(getProductsStart());
        const response = await axios.get(`${API_BASE_URL}/products`);
        dispatch(getProductsSuccess(response.data));
    } catch (error) {
        dispatch(getProductsFailure(error.message));
        console.error("Error fetching products:", error);
    }
};

export const addProductAsync = (newProduct) => async (dispatch) => {
    try {
        dispatch(addProductStart());
        const response = await axios.post(`${API_BASE_URL}/products`, newProduct);
        dispatch(addProductSuccess(response.data));
    } catch (error) {
        dispatch(addProductFailure(error.message));
        console.error("Error adding product:", error);
    }
};

export const updateProductAsync = (productId, updatedProduct) => async (dispatch) => {
    try {
        dispatch(updateProductStart());
        await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProduct);
        dispatch(updateProductSuccess({id: productId, updatedProduct}));
    } catch (error) {
        dispatch(updateProductFailure(error.message));
        console.error("Error updating product:", error);
    }
};

export const deleteProductAsync = (productId) => async (dispatch) => {
    try {
        dispatch(deleteProductStart());
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
        dispatch(deleteProductSuccess(productId));
    } catch (error) {
        dispatch(deleteProductFailure(error.message));
        console.error("Error deleting product:", error);
    }
};

export const decreaseProductStockAsync = (productId, quantity) => async (dispatch) => {
    try {
        dispatch(updateProductStart());
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        const updatedProduct = {...response.data, stock: response.data.stock - quantity};
        await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProduct);
        dispatch(updateProductSuccess({id: productId, updatedProduct}));
    } catch (error) {
        dispatch(updateProductFailure(error.message));
        console.error("Error updating product:", error);
    }
}