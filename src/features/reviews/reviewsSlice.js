import { createSlice } from "@reduxjs/toolkit";

const initialReviewsState = {
    reviews: [],
    error: null,
    isLoading: false,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: initialReviewsState,
    reducers: {
        getReviewsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getReviewsSuccess(state, action) {
            state.isLoading = false;
            state.reviews = action.payload;
        },
        getReviewsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { getReviewsStart, getReviewsSuccess, getReviewsFailure } = reviewsSlice.actions;
export default reviewsSlice.reducer;