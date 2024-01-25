// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCartsState = {
    id: null,
    user_id: null,
    items: [],
    total: null,
    error: null,
    isLoading: false,
};

const cartSlice = createSlice({
    name: "userCart",
    initialState: initialCartsState,
    reducers: {
        setCart: (state, action) => {
            state.id = action.payload.id;
            state.user_id = action.payload.user_id;
            state.items = action.payload.items;
            state.total = action.payload.total;
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
