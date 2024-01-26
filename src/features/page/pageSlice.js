import { createSlice } from "@reduxjs/toolkit";

const initialPageState = {
    currentPage: null,
};

const pageSlice = createSlice({
    name: "currentPage",
    initialState: initialPageState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;

