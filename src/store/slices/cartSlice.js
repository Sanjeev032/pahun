import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id && item.size === newItem.size);
            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        removeItemFromCart(state, action) {
            const { id, size } = action.payload;
            const existingItem = state.items.find((item) => item.id === id && item.size === size);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => !(item.id === id && item.size === size));
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
