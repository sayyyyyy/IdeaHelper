import { createSlice } from '@reduxjs/toolkit';

export const titleListSlice = createSlice({
  name: 'titleList',
  initialState: {
    titleList: [],
  },
  reducers: {
    addTitleList: (state:any, action) => {
      state.titleList.push(action.payload)
      console.log(state)
    },
  },
});

//アクションの設定
export const { addTitleList } = titleListSlice.actions;

export const selectTitleList = (state: any) => {return state.titleListReducer.titleList};