import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    showLoginSideOver: false,
  },
  reducers: {
    setShowLoginSideOver(state, action) {
      state.showLoginSideOver = action.payload;
    },
  },
});

export const globalActions = slice.actions;

export default slice.reducer;
