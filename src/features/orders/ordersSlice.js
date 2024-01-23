import { createSlice } from "@reduxjs/toolkit";


const initialOrdersState = {
    orders: [],
    error: null,
    isLoading: false,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState: initialOrdersState,
    reducers: {
        getOrdersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.error = null;
        },
        getOrdersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addOrderStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.orders.push(action.payload);
            state.error = null;
        },
        addOrderFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteOrderStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteOrderSuccess: (state, action) => {
            state.isLoading = false;
            const orderId = action.payload;
            state.orders = state.orders.filter((order) => order.id !== orderId);
            state.error = null;
        },
        deleteOrderFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;