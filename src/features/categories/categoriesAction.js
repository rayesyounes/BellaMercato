import {getCategoriesStart, getCategoriesSuccess, getCategoriesFailure} from "./categoriesSlice.js";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getCategories = () => async (dispatch) => {
    dispatch(getCategoriesStart());
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
        dispatch(getCategoriesFailure(error.message));
    }
}

// export const getCategoriesByProduct = (product) => async (dispatch) => {
//     dispatch(getCategoriesStart());
//     try {
//         const categories = product.category;
//         const response = await axios.get(`${API_BASE_URL}/categories`);
//         const allCategories = response.data;
//         const productCategories = allCategories.filter((cat) => {
//             if (categories.includes(cat.id)) {
//                 return cat;
//             } else {
//                 return null;
//             }
//         });
//         dispatch(getCategoriesSuccess(productCategories));
//     } catch (error) {
//         dispatch(getCategoriesFailure(error.message));
//     }
// }

