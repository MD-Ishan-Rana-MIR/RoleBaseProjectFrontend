import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("base url is", import.meta.env.VITE_BASE_URL)

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Accept", "application/json");

            return headers;
        },
    }),
    tagTypes: [
        "Auth",
        "Invite"
    ],
    endpoints: () => ({}),
});
