import { configureStore } from '@reduxjs/toolkit';
import currentQueryReducer from './features/currentQuerySlice';
import searchQueryReducer from './features/searchQuerySlice';

export const store = configureStore({
    reducer: {
        currentQueryReducer,
        searchQueryReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
