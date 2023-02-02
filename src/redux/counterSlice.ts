// ライブラリインポート
import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
	value: number;
};

// 初期値の定義
const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
	increment(state) {
		if(state.value < 3){
		state.value++;
		} 
		console.log(state.value)
	}, 
	decrement(state){
		if(state.value > 0){
		state.value--;
		} 
		console.log(state.value)
	},
	},
});

export const selectCount = (state: any) => {return state.counter.value};