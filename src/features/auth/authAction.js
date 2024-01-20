import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

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
            dispatch(loginSuccess({ user: authenticatedUser, isAdmin: authenticatedUser.isAdmin }));
        } else {
            dispatch(loginFailure({ error: "Invalid credentials" }));
        }
    } catch (error) {
        dispatch(loginFailure({ error: "An error occurred during login" }));
    }
};

export const logoutAuth = () => (dispatch) => {
    dispatch(logout());
};
