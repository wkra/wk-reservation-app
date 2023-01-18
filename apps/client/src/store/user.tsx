import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    id: 1
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  }
});

export const userActions = slice.actions;

export default slice.reducer;
