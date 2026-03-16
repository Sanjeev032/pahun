import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        toggleWishlist(state, action) {
            const item = action.payload;
            const index = state.items.findIndex((i) => i.id === item.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(item);
            }
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
