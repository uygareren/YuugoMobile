import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils/utils";
import { LanguageType, ResponseType } from "../../types/response/response";

export const utilApi = createApi({
    reducerPath: "utils",
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_API_URL
    }),
    endpoints: (builder) => ({
        getLanguages: builder.query<LanguageType[], any>({
            query: () => '/user/language',
            transformResponse: (value: ResponseType<LanguageType[]>) => {
                return value.data;
            },
            // merge: ()
            keepUnusedDataFor: 60 * 60 // 60 minutes
        }),
    }),
})

export const { useGetLanguagesQuery } = utilApi;