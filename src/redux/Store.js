import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './contactsApi';
import { authApi } from './authApi';
import { phoneBookSlice } from './phoneBookSlice';
import { themeSlice } from './themeSlice';
import { authSlice } from './authSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filter: phoneBookSlice.reducer,
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
