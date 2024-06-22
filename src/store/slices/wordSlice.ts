import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
    words: any[]
}

const initialState: InitialStateType = {
    words: []
}

export const wordSlice = createSlice({
    initialState,
    name: "word",
    reducers: {
        setWords: (state, action) => {
            state.words = action.payload;
        },
        editWord: (state, action) => {
            const { id, mainText, translatedText, mainLanguageId, translatedLanguageId,
            mainLanguageName, mainLanguageImage, translatedLanguageImage, translatedLanguageName } = action.payload;
            const index = state.words.findIndex((v: any) => v.id == id);
            if(index != -1) {
                state.words[index].mainText = mainText;
                state.words[index].translatedText = translatedText;
                state.words[index].mainLanguageId = mainLanguageId;
                state.words[index].translatedLanguageId = translatedLanguageId;

                state.words[index].mainLanguageName = mainLanguageName;
                state.words[index].mainLanguageImage = mainLanguageImage;

                state.words[index].translatedLanguageImage = translatedLanguageImage;
                state.words[index].translatedLanguageName = translatedLanguageName;

            }
        },
        removeWord: (state, action) => {
            state.words = state.words.filter((v: any) => v.id != action.payload);
        },
    }
});

export const wordSliceActions = wordSlice.actions;