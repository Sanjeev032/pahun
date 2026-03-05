import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import authReducer from './slices/authSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
    },
    preloadedState
});

store.subscribe(() => {
    saveState({
        cart: store.getState().cart,
        wishlist: store.getState().wishlist,
        auth: store.getState().auth,
    });
});
