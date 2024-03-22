import {getBrandsFailure, getBrandsStart, getBrandsSuccess} from "./brandsSlice.js";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getBrands = () => async (dispatch) => {
    dispatch(getBrandsStart());
    try {
        const response = await axios.get(`${API_BASE_URL}/brands`);
        dispatch(getBrandsSuccess(response.data));
    } catch (error) {
        dispatch(getBrandsFailure(error.message));
    }
}

// export const getBrandsByProduct = (product) => async (dispatch) => {
//     dispatch(getBrandsStart());
//     try {
//         const brands = product.brand;
//         const response = await axios.get(`${API_BASE_URL}/brands`);
//         const allBrands = response.data;
//         const productBrands = allBrands.filter((brand) => {
//             if (brands.includes(brand.id)) {
//                 return brand;
//             } else {
//                 return null;
//             }
//         });
//         dispatch(getBrandsSuccess(productBrands));
//     } catch (error) {
//         dispatch(getBrandsFailure(error.message));
//     }
// }
