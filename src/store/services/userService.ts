import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils/utils";
import { LanguageType, ResponseType } from "../../types/response/response";
import { RootStateType } from "../store";

export const userApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const jwt = (getState() as RootStateType).account.jwt;

            if(jwt) {
                headers.set('authorization', `Bearer ${jwt}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getFriends: builder.query<any, any>({
            query: () => '/user/friend?type=friends',
            transformResponse: (value: ResponseType<any>) => {
                const data = value.data;
                console.log(value);
                return data;
            },
            // merge: ()
            keepUnusedDataFor: 60 * 60 // 60 minutes
        }),
        getFriendRequests: builder.query<any, any>({
            query: () => '/user/friend?type=request',
            transformResponse: (value: ResponseType<any>) => {
                const data = value.data;
                console.log(value);
                return data;
            },
            // merge: ()
            keepUnusedDataFor: 60 * 60 // 60 minutes
        }),
        rejectFriendRequest: builder.mutation<any, any>({
            query: (id: number) => ({
                url: '/user/friend/reject/' + id,
                method: "PUT"
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userApi.util.updateQueryData("getFriendRequests", null, (draft) => {
                        return draft.filter((request: any) => request.id !== id);
                    })
                );
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
            },
        }),
        acceptFriendRequest: builder.mutation<any, any>({
            query: (id: number) => ({
                url: '/user/friend/reject/' + id,
                method: "PUT"
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const rejectResult = dispatch(
                    userApi.util.updateQueryData("getFriendRequests", null, (draft) => {
                        return draft.filter((request: any) => request.id !== id);
                    })
                );
                try {
                    const result = await queryFulfilled;
                    const data = result.data.data;
                    dispatch(
                        userApi.util.updateQueryData("getFriends", null, (draft) => {
                            return draft.unshift(data)
                        })
                    );
                } catch {
                    rejectResult.undo()
                }
            },
        })
    }),
})

export const { 
    useGetFriendsQuery, useGetFriendRequestsQuery, useRejectFriendRequestMutation, useAcceptFriendRequestMutation
} = userApi;