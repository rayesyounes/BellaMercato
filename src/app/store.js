// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import productsReducer from '../features/products/productsSlice';
import ordersReducer from '../features/orders/ordersSlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        userCart: cartReducer,
        // checkout: checkoutReducer,
        products: productsReducer,
        users: usersReducer,
        orders: ordersReducer,
        // ui: uiReducer,

    },
});

export default store;
