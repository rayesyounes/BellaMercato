import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredetials, logOut } from '../../features/auth/authSlice';

const baseQueary = fetchBaseQuery({
    baseUrl: "http://localhost:3000/users",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQuearyWithReauth = async (args, api, extraOptions) => {
    let result = await baseQueary(args, api, extraOptions);
    if (result?.error?.status === 403) {
        console.log("sending refresh token request");
        const refrechResult = await baseQueary("/refresh", api, extraOptions);
        console.log("refreshResult", refrechResult);
        if (refrechResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredetials({ ...refrechResult.data, user }));
            result = await baseQueary(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQuearyWithReauth,
    endpoints: (builder) => ({})
});