import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsApi } from './contactsApi';
import { authApi } from './authApi';
import { phoneBookSlice } from './phoneBookSlice';
import { themeSlice } from './themeSlice';
import { authSlice } from './authSlice';

const persistConfigAuth = {
  key: 'auth',
  storage,
  whiteList: ['token'],
};

const persistConfigTheme = {
  key: 'theme',
  storage,
};

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filter: phoneBookSlice.reducer,
    theme: persistReducer(persistConfigAuth, themeSlice.reducer),
    auth: persistReducer(persistConfigTheme, authSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
