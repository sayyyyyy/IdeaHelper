import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from "next/head";
import { MantineProvider } from '@mantine/core';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AppShell,Navbar, Footer, Header,Text,Stepper, Button, Group } from '@mantine/core';
import { store } from '@/redux/store';
import { useRouter } from "next/router";

import { selectIdea } from '@/redux/ideaSlice'

import { Sidebar } from '@/components/sidebar';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>Idea Helper</title>
      </Head>
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
            navbar={<Navbar width={{base:200}} style={{backgroundColor:"#FFFEF9"}}><Sidebar></Sidebar></Navbar>} 
          >
            <Component {...pageProps}/>
          </AppShell>
        </MantineProvider>
      </Provider>
    </>
  );
}