import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const phoneBookSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = phoneBookSlice.actions;
