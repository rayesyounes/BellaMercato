import {loginStart, loginSuccess, loginFailure, logout, clearAuthError} from "./authSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const API_BASE_URL = "https://ray-store-data.vercel.app";

export const loginAuth = (authCredential) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const response = await axios.get(`${API_BASE_URL}/users`, {
            params: {
                email: authCredential.email,
                password: authCredential.password,
            },
        });

        const authenticatedUser = response.data[0];

        if (authenticatedUser) {
            dispatch(loginSuccess({user: authenticatedUser, isAdmin: authenticatedUser.isAdmin}));
        } else {
            dispatch(loginFailure({error: "Invalid credentials"}));
        }
    } catch (error) {
        dispatch(loginFailure({error: "An error occurred during login"}));
    }
};

export const logoutAuth = () => (dispatch) => {
    dispatch(logout());
};

export const resetErors = () => (dispatch) => {
    dispatch(clearAuthError());
}
