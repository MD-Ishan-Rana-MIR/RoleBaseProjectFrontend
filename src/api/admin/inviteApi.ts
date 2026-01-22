import type { InviteApiPayloadType, InviteApiResType } from "../../utility/type/inviteType"
import { baseApi } from "../base-api/baseApi"

export const inviteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        sendInvite: builder.mutation<InviteApiResType, InviteApiPayloadType>({
            query: (data) => ({
                url: `/auth/invite`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"]
        }),
        inviteRegistration: builder.mutation({
            query: (data) => ({
                url: `/auth/register-via-invite`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        allUser: builder.query({
            query: ({ page = 1, limit = 10, search = "", status, role }) => ({
                url: "/users-pagination",
                params: { page, limit, search, status, role }
            }),
            providesTags: ["User"]
        }),

        singleUser: builder.query({
            query: (id) => ({
                url: `/single-user/${id}`,
                method: "GET"
            }),
            providesTags: ["User"]
        }),

        userStatusUpdateApi: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}/status`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        userRoleUpdate: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}/role`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["User"]
        }),






    }),
})

export const { useSendInviteMutation, useInviteRegistrationMutation, useAllUserQuery, useSingleUserQuery, useUserStatusUpdateApiMutation, useUserRoleUpdateMutation } = inviteApi
