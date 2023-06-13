import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./slice/demoSlice";
const store = configureStore({
  reducer: {
    demo: demoReducer
  },
});

export default store;