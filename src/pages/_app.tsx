import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";


export type CounterState = {
  value: number;
};
// 初期値の定義
const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    decrement(state) {
      if(state.value < 3){
        state.value++;
      } 
      console.log(state.value)
    },
    increment(state) {
      if(state.value > 0){
        state.value--;
      } 
      console.log(state.value)
    },
  },
});

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export const selectCount = (state: any) => {return state.counter.value};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Provider store={store}>
        {/* <Head>
          <title>Page title</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head> */}

        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </Provider>
    </>
  );
}