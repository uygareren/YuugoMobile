import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils/utils";
import { LanguageType, ResponseType } from "../../types/response/response";
import { RootStateType } from "../store";
import { accountSliceActions } from "../slices/accountSlice";

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
        getUserProfile: builder.query<any, any>({
            query: (id: number) => '/user/' + id,
            transformResponse: (value: ResponseType<any>) => {
                const data = value.data;
                return data;
            },
        }),
        getFriends: builder.query<any, any>({
            query: () => '/user/friend?type=friends',
            transformResponse: (value: ResponseType<any>) => {
                const data = value.data;
                return data;
            },
            // merge: ()
            keepUnusedDataFor: 60 * 60 // 60 minutes
        }),
        getFriendRequests: builder.query<any, any>({
            query: () => '/user/friend?type=request',
            transformResponse: (value: ResponseType<any>) => {
                const data = value.data;
                return data;
            },
            // merge: ()
            keepUnusedDataFor: 60 * 60 // 60 minutes
        }),
        removeFriend: builder.mutation<any, any>({
            query: (id: number) => ({
                url: '/user/friend/' + id,
                method: "DELETE"
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const userProfilePatch = dispatch(
                    userApi.util.updateQueryData("getUserProfile", id, (draft) => {
                        draft.friendStatus = null;
                    })
                );

                const patchResult = dispatch(
                    userApi.util.updateQueryData("getFriends", null, (draft) => {
                        return draft.filter((request: any) => request.id !== id);
                    })
                );

                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                  userProfilePatch.undo();
                }
            },
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
                
                dispatch(accountSliceActions.decrementFriendRequest());
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
            },
        }),
        acceptFriendRequest: builder.mutation<any, any>({
            query: ({id, friendId}: any) => ({
                url: '/user/friend/accept/' + id,
                body: { friendId },
                method: "PUT"
            }),
            async onQueryStarted({id}, { dispatch, queryFulfilled }) {
                const rejectResult = dispatch(
                    userApi.util.updateQueryData("getFriendRequests", null, (draft) => {
                        return draft.filter((request: any) => request.id !== id);
                    })
                );

                dispatch(accountSliceActions.decrementFriendRequest());
                try {
                    const result = await queryFulfilled;
                    const data = result.data.data;
                    console.log("data", data);
                    dispatch(
                        userApi.util.updateQueryData("getFriends", null, (draft) => {
                            draft.unshift(data)
                        })
                    );
                } catch(error: any) {
                    console.log(error);
                    rejectResult.undo()
                }
            },
        })
    }),
})

export const { useGetUserProfileQuery,
    useGetFriendsQuery, useGetFriendRequestsQuery, useRejectFriendRequestMutation, useAcceptFriendRequestMutation,
    useRemoveFriendMutation
} = userApi;