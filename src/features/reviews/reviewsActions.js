import {
    getReviewsStart, getReviewsSuccess, getReviewsFailure
} from "./reviewsSlice.js";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";


export const getReviewsAsync = () => async (dispatch) => {
    try {
        dispatch(getReviewsStart());
        const response = await axios.get(`${API_BASE_URL}/reviews`);
        dispatch(getReviewsSuccess(response.data));
    } catch (error) {
        dispatch(getReviewsFailure(error.message));
        console.error("Error fetching reviews:", error);
    }
}

export const getReviewsByProductIdAsync = (productId) => async (dispatch) => {
    try {
        dispatch(getReviewsStart());
        const response = await axios.get(`${API_BASE_URL}/reviews?product_id=${productId}`);
        dispatch(getReviewsSuccess(response.data));
    } catch (error) {
        dispatch(getReviewsFailure(error.message));
        console.error("Error fetching reviews:", error);
    }
}