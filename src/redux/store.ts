import { configureStore, createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import {ideaListSlice} from "./idealistSlice"

export const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      ideaListReducer: ideaListSlice.reducer,
    },
});