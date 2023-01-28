import { configureStore, createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import {ideaListSlice} from "./idealistSlice"
import { ideaSlice } from "./ideaSlice";
import { titleListSlice } from "./titleListSlice";
import { chatListSlice } from "./chatListSlice";
import { documentSlice } from "./documentSlice";

export const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      ideaListReducer: ideaListSlice.reducer,
      ideaReducer: ideaSlice.reducer,
      titleListReducer: titleListSlice.reducer,
      chatListReducer: chatListSlice.reducer,
      documentReducer: documentSlice.reducer,
    },
});