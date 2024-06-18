import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { accountSlice } from './slices/accountSlice';
import { utilApi } from './services/utilSerivce';

export const store = configureStore({ 
    reducer: {
        [utilApi.reducerPath]: utilApi.reducer,
        account: accountSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(utilApi.middleware)
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootStateType = ReturnType<typeof store.getState>