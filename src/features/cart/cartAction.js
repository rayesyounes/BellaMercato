// cartAction.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCart, setError, setLoading } from "./cartSlice";

const API_BASE_URL = "http://localhost:3000";

const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async (userId, { dispatch }) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find(cart => cart.user_id === userId);

        if (userCart) {
            dispatch(setCart(userCart));
        }

        dispatch(setLoading(false));
        return userCart;
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});

export { fetchUserCart };
