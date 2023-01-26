import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AppShell,Navbar, Footer, Header,Text,Stepper, Button, Group } from '@mantine/core';
import { store } from '@/redux/store';


// export type CounterState = {
//   value: number;
// };
// // 初期値の定義
// const initialState: CounterState = { value: 0 };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     decrement(state) {
//       if(state.value < 3){
//         state.value++;
//       } 
//       console.log(state.value)
//     },
//     increment(state) {
//       if(state.value > 0){
//         state.value--;
//       } 
//       console.log(state.value)
//     },
//   },
// });

// export const ideaSlice = createSlice({
//   name: "ideaList",
//   initialState:[],
//   reducers: {},
// });


// export const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//     ideaList: counterSlice.reducer,
//   },
// });

// export const selectCount = (state: any) => {return state.counter.value};
// export const selectIdea = (state: any) => {return state.ideaList.value};

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
          <AppShell navbar={
            <Navbar width={{base:200}} >
              <Navbar.Section  mt="md">幅設定ほぼ必須.型は後述</Navbar.Section>
              <Navbar.Section  mt="md">幅設定ほぼ必須.型は後述</Navbar.Section>
            </Navbar>} >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </Provider>
    </>
  );
}