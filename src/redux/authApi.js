import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: data => {
        return {
          url: 'users/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query: data => {
        return {
          url: 'users/login',
          method: 'POST',
          body: data,
        };
      },
    }),
    logOutUser: builder.mutation({
      query: () => {
        return {
          url: 'users/logout',
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
} = authApi;
