import { createSlice } from '@reduxjs/toolkit';

export const ideaSlice = createSlice({
  name: 'idea',
  initialState: {
    idea: '',
  },
  reducers: {
    setIdea: (state, action) => {
        console.log(action.payload)
      state.idea = action.payload;
    },
  },
});

//アクションの設定
export const { setIdea } = ideaSlice.actions;

export const selectIdea = (state: any) => {return state.ideaReducer.idea};