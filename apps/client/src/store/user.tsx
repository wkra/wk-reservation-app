import { createSlice } from "@reduxjs/toolkit";
import { FullUserModel } from "../interfaces";

const slice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    username: "",
    userType: {
      id: 0,
      label: "",
      isAdmin: false,
    },
  },
  reducers: {
    setUser(state, action) {
      const { id, username, userType } = action.payload as FullUserModel;

      state.id = id;
      state.username = username;
      state.userType.id = userType.id;
      state.userType.label = userType.label;
      state.userType.isAdmin = userType.isAdmin;
    },
    resetUser(state) {
      state.id = 0;
      state.username = "";
      state.userType.id = 0;
      state.userType.label = "";
      state.userType.isAdmin = false;
    },
  },
});

export const userActions = slice.actions;

export default slice.reducer;
