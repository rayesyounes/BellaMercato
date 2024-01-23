// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCartsState = {
    cart: null,
    error: null,
    isLoading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartsState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setError: (state, action) => {
            state.error = { message: action.payload };
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export default cartSlice.reducer;
export const { setCart, setError, setLoading } = cartSlice.actions;
