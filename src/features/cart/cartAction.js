import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCart, setError, setLoading } from "./cartSlice";

const API_BASE_URL = "https://ray-store-data.vercel.app";

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

const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async ({ userId, productId }, {
    dispatch, getState
}) => {
    try {
        dispatch(setLoading(true));

        const { products } = getState().products;
        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);
        const itemToUpdate = userCart.items.find((item) => item.product_id === productId);

        if (itemToUpdate) {
            itemToUpdate.quantity += 1;

            const updatedCart = { ...userCart };
            await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
                dispatch(setCart(updatedCart));
            });
        }

        let total = 0;
        userCart.items.forEach((item) => {
            const product = products.find((product) => product.id === item.product_id);
            if (product) {
                total += product.price * item.quantity;
            }
        });

        const updatedCart = { ...userCart, total };
        await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
            dispatch(setCart(updatedCart));
        });

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});


const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async ({ userId, productId }, {
    dispatch, getState
}) => {
    try {
        dispatch(setLoading(true));

        const { products } = getState().products;
        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);
        const itemToUpdate = userCart.items.find((item) => item.product_id === productId);

        if (itemToUpdate) {

            itemToUpdate.quantity -= 1;
            const updatedCart = { ...userCart };
            await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
                dispatch(setCart(updatedCart));
            })
        }

        let total = 0;
        userCart.items.forEach((item) => {
            const product = products.find((product) => product.id === item.product_id);
            if (product) {
                total += product.price * item.quantity;
            }
        });

        const updatedCart = { ...userCart, total };
        await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
            dispatch(setCart(updatedCart));
        });

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});

const removeItem = createAsyncThunk("cart/removeItem", async ({ userId, productId }, { dispatch, getState }) => {
    try {
        dispatch(setLoading(true));

        const { products } = getState().products;
        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);
        const itemToRemove = userCart.items.find((item) => item.product_id === productId);

        if (itemToRemove) {
            const updatedItems = userCart.items.filter((item) => item.product_id !== productId);
            let total = 0;

            updatedItems.forEach((item) => {
                const product = products.find((product) => product.id === item.product_id);
                if (product) {
                    total += product.price * item.quantity;
                }
            });

            const updatedCart = { ...userCart, items: updatedItems, total };
            await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
                dispatch(setCart(updatedCart));
            });
        }

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});

const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }, { dispatch, getState }) => {
    try {
        dispatch(setLoading(true));

        const { products } = getState().products;
        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);
        const productToAdd = products.find((product) => product.id === productId);

        if (userCart && productToAdd) {
            const itemToUpdate = userCart.items.find((item) => item.product_id === productId);

            if (itemToUpdate) {
                itemToUpdate.quantity += quantity;
            } else {
                userCart.items.push({ product_id: productId, quantity: quantity });
            }

            let total = 0;
            userCart.items.forEach((item) => {
                const product = products.find((product) => product.id === item.product_id);
                if (product) {
                    total += product.price * item.quantity;
                }
            });

            const updatedCart = { ...userCart, total };
            await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
                dispatch(setCart(updatedCart));
            });
        }

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});

const clearCart = createAsyncThunk("cart/clearCart", async ( userId , { dispatch }) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.get(`${API_BASE_URL}/carts`);
        const userCart = response.data.find((cart) => cart.user_id === userId);

        if (userCart) {
            const updatedCart = { ...userCart, items: [], total: 0 };
            await axios.put(`${API_BASE_URL}/carts/${userCart.id}`, updatedCart).then(() => {
                dispatch(setCart(updatedCart));
            });
        }

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
        throw error;
    }
});




export { fetchUserCart, decreaseQuantity, increaseQuantity, removeItem, addToCart, clearCart };
