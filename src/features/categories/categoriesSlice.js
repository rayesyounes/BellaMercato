import {createSlice} from "@reduxjs/toolkit";

const initialCategoriesState = {
    categories: [],
    error: null,
    isLoading: false,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        getCategoriesStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getCategoriesSuccess(state, action) {
            state.isLoading = false;
            state.categories = action.payload;
        },
        getCategoriesFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {getCategoriesStart, getCategoriesSuccess, getCategoriesFailure} = categoriesSlice.actions;
export default categoriesSlice.reducer;

