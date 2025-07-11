import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userReducer from './slices/userSlice';
import favouriteReducer from './slices/favouriteSlice';
import cartReducer from './slices/cartSlice'

const rootReducer = combineReducers({
    user: userReducer,
    favourite: favouriteReducer,
    cart: cartReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user','favourite','cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these redux-persist actions
            ignoredActions: [
                'persist/PERSIST',
                'persist/REHYDRATE',
                'persist/PAUSE',
                'persist/FLUSH',
                'persist/REGISTER',
                'persist/PURGE',
            ],
        },
    }),
});

// to fetch the data when app reloads
export const persistor = persistStore(store);

//typesafety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;