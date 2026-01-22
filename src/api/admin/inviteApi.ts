import type { InviteApiPayloadType, InviteApiResType } from "../../utility/type/inviteType"
import { baseApi } from "../base-api/baseApi"

export const inviteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        sendInvite: builder.mutation<InviteApiResType, InviteApiPayloadType>({
            query: (data) => ({
                url: `/auth/invite`,
                method: "POST",
                body: data
            })
        })




    }),
})

export const { useSendInviteMutation } = inviteApi
