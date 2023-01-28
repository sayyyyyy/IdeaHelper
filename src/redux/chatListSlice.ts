import { createSlice } from '@reduxjs/toolkit';

export const chatListSlice = createSlice({
  name: 'chatList',
  initialState: {
    chatList: [],
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },
});

//アクションの設定
export const { setChatList } = chatListSlice.actions;

export const selectChatList = (state: any) => {return state.ideaReducer.idea};