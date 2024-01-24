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

const updateCartOnServer = async (userId, updatedCart) => {
    try {
        await axios.put(`${API_BASE_URL}/carts/${userId}`, { products: updatedCart });
    } catch (error) {
        // Handle the error (e.g., dispatch an action)
        console.error("Failed to update cart on server", error);
        throw error;
    }
};

const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async ({ userId, productId }, { dispatch }) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);

        console.log(userCart);

        // const updatedCart = userCart.products.map((product) => {
        //     if (product.id === productId && product.quantity > 0) {
        //         return {
        //             ...product,
        //             quantity: product.quantity - 1,
        //         };
        //     }
        //     return product;
        // });

        // const updatedUserCart = {
        //     ...userCart,
        //     products: updatedCart,
        // };

        // // Check if the quantity is already at 0 before updating the cart
        // if (!updatedCart.find((product) => product.id === productId && product.quantity > 0)) {
        //     dispatch(setLoading(false));
        //     return updatedUserCart;
        // }

        // // Update the cart on the server
        // await updateCartOnServer(userId, updatedCart);

        // dispatch(setCart(updatedUserCart));
        // dispatch(setLoading(false));
        // return updatedUserCart;
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});

export { fetchUserCart, increaseQuantity, decreaseQuantity };
