import {createSlice} from "@reduxjs/toolkit";

const inicialBrandsState = {
    brands: [],
    error: null,
    isLoading: false,
};

const brandsSlice = createSlice({
    name: "brands",
    initialState: inicialBrandsState,
    reducers: {
        getBrandsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBrandsSuccess(state, action) {
            state.isLoading = false;
            state.brands = action.payload;
        },
        getBrandsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {getBrandsStart, getBrandsSuccess, getBrandsFailure} = brandsSlice.actions;
export default brandsSlice.reducer;