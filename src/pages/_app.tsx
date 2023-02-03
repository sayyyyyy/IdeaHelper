//ライブラリインポート
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from "next/head";
import { AppShell,Navbar } from '@mantine/core';
import { store } from '@/redux/store';
import { useRouter } from "next/router";

// 環境変数
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

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