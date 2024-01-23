import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    products: [],
    error: null,
    isLoading: false,
};

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        getProductsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null;
        },
        getProductsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addProductStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addProductSuccess: (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload);
            state.error = null;
        },
        addProductFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateProductStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateProductSuccess: (state, action) => {
            state.isLoading = false;
            const { id, updatedProduct } = action.payload;
            const index = state.products.findIndex((product) => product.id === id);
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...updatedProduct };
            }
            state.error = null;
        },
        updateProductFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteProductStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteProductSuccess: (state, action) => {
            state.isLoading = false;
            const productId = action.payload;
            state.products = state.products.filter((product) => product.id !== productId);
            state.error = null;
        },
        deleteProductFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
