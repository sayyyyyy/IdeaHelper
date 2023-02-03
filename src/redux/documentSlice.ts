// ライブラリインポート
import { createSlice } from '@reduxjs/toolkit';

export const documentSlice = createSlice({
	name: 'document',
	initialState: {
		document: [{}],
	},
	reducers: {
		setDocument: (state, action) => {
			state.document = action.payload;
		},
	},
});

//アクションの設定
export const { setDocument } = documentSlice.actions;

export const selectDocument = (state: any) => {return state.documentReducer.document};