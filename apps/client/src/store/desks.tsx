import { createSlice } from "@reduxjs/toolkit";
import { Desk } from "../interfaces";

interface DateState {
  items: Desk[];
}

const initialState: DateState = {
  items: [],
};

const slice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    replaceItems(state, action) {
      state.items = action.payload || [];
    },
    addItem(state, action) {
      if (action.payload) {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const desksActions = slice.actions;

export default slice.reducer;
