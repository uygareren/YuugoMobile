import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { accountSlice } from './slices/accountSlice';

export const store = configureStore({ 
    reducer: {
        "account": accountSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootStateType = ReturnType<typeof store.getState>