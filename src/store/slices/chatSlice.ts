import { createSlice } from "@reduxjs/toolkit";
import { ChatRoomsType } from "../../types/response/response";

type InitialStateType = {
    chats: ChatRoomsType[],
    loading: boolean,
    chatInfo: any
}

const initialState: InitialStateType = {
    chats: [],
    loading: true,
    chatInfo: {},
}

export const chatSlice = createSlice({
    initialState,
    name: "chat",
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const chatSliceActions = chatSlice.actions;