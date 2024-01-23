import {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
} from "./ordersSlice";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getOrdersAsync = () => async (dispatch) => {
    try {
        dispatch(getOrdersStart());
        const response = await axios.get(`${API_BASE_URL}/orders`);
        dispatch(getOrdersSuccess(response.data));
    } catch (error) {
        dispatch(getOrdersFailure(error.message));
        console.error("Error fetching orders:", error);
    }
};

export const addOrderAsync = (newOrder) => async (dispatch) => {
    try {
        dispatch(addOrderStart());
        const response = await axios.post(`${API_BASE_URL}/orders`, newOrder);
        dispatch(addOrderSuccess(response.data));
    } catch (error) {
        dispatch(addOrderFailure(error.message));
        console.error("Error adding order:", error);
    }
};

export const deleteOrderAsync = (orderId) => async (dispatch) => {
    try {
        dispatch(deleteOrderStart());
        await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
        dispatch(deleteOrderSuccess(orderId));
    } catch (error) {
        dispatch(deleteOrderFailure(error.message));
        console.error("Error deleting order:", error);
    }
};