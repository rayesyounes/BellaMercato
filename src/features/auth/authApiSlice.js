import { apiSlice } from "../app/api/apiSlice";
export const { useGetUsersQuery } = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials }
            }),
        }),
    }),
})