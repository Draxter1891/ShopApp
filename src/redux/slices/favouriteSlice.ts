import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    isFav?: boolean;
}

interface FavouriteState {
    items: Product[];
}

const initialState: FavouriteState = {
    items: []
}

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addToFavourite: (state, action: PayloadAction<Product>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push({ ...action.payload, isFav: true });  // ✅ Mark as true when adding
            }
        },
        removeFromFavourites: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleFavorite: (state, action: PayloadAction<Product>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            } else {
                state.items.push({ ...action.payload, isFav: true });
            }
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    }
});

export const {
    addToFavourite, removeFromFavourites, toggleFavorite, clearFavorites
} = favouriteSlice.actions;

export default favouriteSlice.reducer;
