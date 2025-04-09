import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  userList: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
    userList: (state, action) => {
      state.userList = action.payload.userList;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, userList } =
  authSlice.actions;

export default authSlice.reducer;
