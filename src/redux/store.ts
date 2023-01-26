import { configureStore, createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

export const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      ideaList: counterSlice.reducer,
    },
});