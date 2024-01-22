// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // cart: cartReducer,
        // checkout: checkoutReducer,
        // products: productsReducer,
        users: usersReducer,
        // orders: ordersReducer,
        // ui: uiReducer,

    },
});

export default store;
