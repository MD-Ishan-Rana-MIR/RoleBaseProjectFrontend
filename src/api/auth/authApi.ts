import type { LoginApiResType, LoginPayloadType } from "../../utility/type/authType"
import { baseApi } from "../base-api/baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<LoginApiResType, LoginPayloadType>({
            query: (data) => ({
                url: `/auth/login`,
                method: "POST",
                body: data
            })
        })




    }),
})

export const { useLoginMutation } = authApi
