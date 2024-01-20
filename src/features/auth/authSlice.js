import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    error: null,
    isLoading: false,
    isAdmin: false,
    isAuthenticated: false,
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

export const { loginStart, loginSuccess, loginFailure, logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
