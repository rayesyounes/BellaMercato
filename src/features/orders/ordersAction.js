import {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
} from "./ordersSlice";
import axios from "axios";

const API_BASE_URL = "https://ray-store-data.vercel.app";

export const getOrdersAsync = (userId) => async (dispatch) => {
    if (userId) {
        try {
            dispatch(getOrdersStart());
            const response = await axios.get(`${API_BASE_URL}/orders?user_id=${userId}`);
            dispatch(getOrdersSuccess(response.data));
        } catch (error) {
            dispatch(getOrdersFailure(error.message));
            console.error("Error fetching orders:", error);
        }
    } else {
        try {
            dispatch(getOrdersStart());
            const response = await axios.get(`${API_BASE_URL}/orders`);
            dispatch(getOrdersSuccess(response.data));
        } catch (error) {
            dispatch(getOrdersFailure(error.message));
            console.error("Error fetching orders:", error);
        }
    }
};

export const getOrderAsync = (orderId) => async (dispatch) => {
    try {
        dispatch(getOrdersStart());
        const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
        dispatch(getOrdersSuccess(response.data));
    } catch (error) {
        dispatch(getOrdersFailure(error.message));
        console.error("Error fetching orders:", error);
    }
}

export const updateOrderAsync = (orderId, updatedOrder) => async (dispatch) => {
    try {
        dispatch(updateOrderStart());
        await axios.put(`${API_BASE_URL}/orders/${orderId}`, updatedOrder);
        dispatch(updateOrderSuccess({id: orderId, updatedOrder}));
    } catch (error) {
        dispatch(updateOrderFailure(error.message));
        console.error("Error updating order:", error);
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

export const filterOrdersByStatus = (orders, status) => async (dispatch) => {
    try {
        dispatch(getOrdersStart());
        dispatch(getOrdersSuccess(orders.filter(order => order.status === status)));
    } catch (error) {
        dispatch(getOrdersFailure(error.message));
        console.error("Error fetching orders:", error);
    }
}