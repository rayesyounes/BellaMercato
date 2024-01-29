import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} from "./usersSlice";
import axios from "axios";

const API_BASE_URL = "https://ray-store-data.vercel.app";

export const getUsersAsync = () => async (dispatch) => {
    try {
        dispatch(getUsersStart());
        const response = await axios.get(`${API_BASE_URL}/users`);
        dispatch(getUsersSuccess(response.data));
    } catch (error) {
        dispatch(getUsersFailure(error.message));
        console.error("Error fetching users:", error);
    }
};

export const addUserAsync = (newUser) => async (dispatch) => {
    try {
        dispatch(addUserStart());
        const response = await axios.post(`${API_BASE_URL}/users`, newUser);
        dispatch(addUserSuccess(response.data));
    } catch (error) {
        dispatch(addUserFailure(error.message));
        console.error("Error adding user:", error);
    }
};

export const updateUserAsync = (userId, updatedUser) => async (dispatch) => {
    try {
        dispatch(updateUserStart());
        await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
        dispatch(updateUserSuccess({ id: userId, updatedUser }));
    } catch (error) {
        dispatch(updateUserFailure(error.message));
        console.error("Error updating user:", error);
    }
};

export const deleteUserAsync = (userId) => async (dispatch) => {
    try {
        dispatch(deleteUserStart());
        await axios.delete(`${API_BASE_URL}/users/${userId}`);
        dispatch(deleteUserSuccess(userId));
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
        console.error("Error deleting user:", error);
    }
};
