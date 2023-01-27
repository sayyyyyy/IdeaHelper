import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AppShell,Navbar, Footer, Header,Text,Stepper, Button, Group } from '@mantine/core';
import { store } from '@/redux/store';


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
          <AppShell padding="md" 
            navbar={
              <Navbar width={{base:200}} >
              <Navbar.Section  mt="md" >IdeaHelper</Navbar.Section>
              <hr />
              <Navbar.Section  mt="md">幅設定ほぼ必須.型は後述</Navbar.Section>
              </Navbar>
            } 
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </Provider>
    </>
  );
}