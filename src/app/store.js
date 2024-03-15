// store.js
import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import cartReducer from '../features/cart/cartSlice';
import pageReducer from '../features/page/pageSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import categoriesSlice from "../features/categories/categoriesSlice.js";
import brandsSlice from "../features/brands/brandsSlice.js";
// import colorModeReducer from '../features/colorMode/colorModeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        userCart: cartReducer,
        products: productsReducer,
        users: usersReducer,
        orders: ordersReducer,
        page: pageReducer,
        reviews: reviewsReducer,
        categories: categoriesSlice,
        brands: brandsSlice,
        // colorMode : colorModeReducer,

    },
});

export default store;
