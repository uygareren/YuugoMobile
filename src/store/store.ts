import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

export const store = configureStore({ 
    reducer: {
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootStateType = ReturnType<typeof store.getState>