import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    userInfo: {
        email: string;
        isActiveNotification: boolean;
        isActiveEmailSubscribe: boolean;
    
        id: number;
        accountId: number;
    
        countryId: number;
        countryName: string;
        countryCode: string;
        flag: string;
    
        name: string;
        surname: string;
        birthDate: string;
        gender: string;
        avatarUrl: string;
    
        languages: {id: number, languageName: string, levels: string}[];
    } | null,
    jwt: string | null;
}

const initialState: InitialStateType = {
    userInfo: null,
    jwt: null
}

export const accountSlice = createSlice({
    initialState,
    name: "account",
    reducers: {
        setAccount: (state, action) => {
            state.userInfo = action.payload;
        },
        setJwt: (state, action) => {
            state.jwt = action.payload;
        },
        clearAccount: (state) => {
            state.userInfo = null;
            state.jwt = null;
        }
    }
});

export const accountSliceActions = accountSlice.actions;