import { createSlice } from "@reduxjs/toolkit";

const initState = {
  loggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export default loginSlice.reducer;
export const { logIn, logOut } = loginSlice.actions;
