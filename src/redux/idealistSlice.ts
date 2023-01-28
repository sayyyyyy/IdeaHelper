import { createSlice } from '@reduxjs/toolkit';

export const ideaListSlice = createSlice({
  name: 'ideaList',
  initialState: {
    ideaList: [],
  },
  reducers: {
    setIdeaList: (state, action) => {
      state.ideaList = action.payload;
    },
  },
});

//アクションの設定
export const { setIdeaList } = ideaListSlice.actions;

export const selectIdeaList = (state: any) => {return state.ideaListReducer.ideaList};