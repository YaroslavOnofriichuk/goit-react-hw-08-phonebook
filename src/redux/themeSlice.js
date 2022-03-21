import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = !state.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
