import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  // tagTypes: ['Contacts'],
  endpoints: builder => ({
    // getContacts: builder.query({
    //   query: () => `contacts`,
    //   providesTags: result =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: 'Contacts', id })),
    //           { type: 'Contacts', id: 'LIST' },
    //         ]
    //       : [{ type: 'Contacts', id: 'LIST' }],
    // }),
    registerUser: builder.mutation({
      query: data => {
        return {
          url: 'users/signup',
          method: 'POST',
          body: data,
        };
      },
      // invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    // deleteContact: builder.mutation({
    //   query: id => {
    //     return {
    //       url: `contacts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
    // }),
  }),
});

export const { useRegisterUserMutation } = userApi;