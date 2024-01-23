import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
    users: [],
    error: null,
    isLoading: false,
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {
        getUsersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getUsersSuccess: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = null;
        },
        getUsersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addUserStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addUserSuccess: (state, action) => {
            state.isLoading = false;
            state.users.push(action.payload);
            state.error = null;
        },
        addUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.isLoading = false;
            const { id, updatedUser } = action.payload;
            const index = state.users.findIndex((user) => user.id === id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updatedUser };
            }
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.isLoading = false;
            const userId = action.payload;
            state.users = state.users.filter((user) => user.id !== userId);
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
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
} = usersSlice.actions;

export default usersSlice.reducer;
