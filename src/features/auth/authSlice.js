import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: "3",
        username: 'rayesyounes',
        first_name: "younes",
        last_name: "rayes",
        gender: "m",
        email: 'rayesyounes@gmail.com',
        phone: "123-456-7890",
        password: '11111111',
        avatar: "",
        billingAddress: "456 Oak St, Townsville",
        address: '',
        country: "USA",
        state: "CA",
        city: "Los Angeles",
        zip: "90001",
        isAdmin: false,
    },
    error: null,
    isLoading: false,
    isAdmin: false,
    isAuthenticated: true
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.isAdmin = action.payload.isAdmin || false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.error;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isAdmin = false;
            state.error = null;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
});

export const {loginStart, loginSuccess, loginFailure, logout, clearAuthError} = authSlice.actions;

export default authSlice.reducer;
