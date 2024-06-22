import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { accountSlice } from './slices/accountSlice';
import { utilApi } from './services/utilSerivce';
import { userApi } from './services/userService';
import { wordSlice } from './slices/wordSlice';

export const store = configureStore({ 
    reducer: {
        [utilApi.reducerPath]: utilApi.reducer,
        account: accountSlice.reducer,
        word: wordSlice.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(utilApi.middleware).concat(userApi.middleware)
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootStateType = ReturnType<typeof store.getState>