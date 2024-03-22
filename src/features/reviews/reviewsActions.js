import {getReviewsFailure, getReviewsStart, getReviewsSuccess} from "./reviewsSlice.js";
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

export const postReviewAsync = (productId, selectedStars, comment) => async (dispatch, getState) => {
    const {user} = getState().auth;
    const review = {
        user_id: user.id,
        product_id: productId,
        rating: selectedStars,
        comment: comment,
        date: new Date().toISOString()
    };
    try {
        const existingReviewResponse = await axios.get(`${API_BASE_URL}/reviews?product_id=${productId}&user_id=${user.id}`);
        if (existingReviewResponse.data.length > 0) {
            const existingReviewId = existingReviewResponse.data[0].id;
            const updateResponse = await axios.put(`${API_BASE_URL}/reviews/${existingReviewId}`, review);
            console.log("Review updated:", updateResponse.data);
        } else {
            const postResponse = await axios.post(`${API_BASE_URL}/reviews`, review);
            console.log("Review posted:", postResponse.data);
        }

        dispatch(getReviewsByProductIdAsync(productId));
    } catch (error) {
        console.error("Error posting or updating review:", error);
    }
};
