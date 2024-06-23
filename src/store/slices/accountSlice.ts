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

        friendRequestCount: number;
    
        languages: {id: number, languageName: string, level: string}[];
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
            state.jwt = action.payload.jwt;
            state.userInfo = action.payload.userInfo;
        },
        setJwt: (state, action) => {
            state.jwt = action.payload;
        },
        addLanguage: (state, action) => {
            state.userInfo?.languages.push(action.payload);
        },
        updateLanguage: (state, action) => {
            const { index, title } = action.payload;
            
            if (state.userInfo && state.userInfo.languages) {
                state.userInfo.languages[index].level = title;
            }
        },
        editAccountInfo: (state, action) => {   
            state.userInfo = {
                ...state.userInfo,
                ...action.payload
            }
        },
        clearAccount: (state) => {
            state.userInfo = null;
            state.jwt = null;
        },
        decrementFriendRequest: (state) => {
            if(state.userInfo) {
                state.userInfo.friendRequestCount -= 1; 
            }
        }
    }
});

export const accountSliceActions = accountSlice.actions;