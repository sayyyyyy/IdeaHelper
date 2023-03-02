//ライブラリインポート
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from "next/head";
import { AppShell,Navbar } from '@mantine/core';
import { store } from '@/redux/store';
import { useRouter } from "next/router";

// 環境変数
import { MantineProvider,createStyles,Header, } from '@mantine/core';
import { Provider } from 'react-redux';
import { Sidebar } from '@/components/sidebar';

const HEADER_HEIGHT = 100;

const useStyles = createStyles((theme) => ({
  pc:{
    [`@media (max-width: 2000px)`]: {
		  display:"block",
      // marginTop:100
	  },
	  '@media (max-width:800px)': {
      display: 'none',
	  },
  },
  sp:{
    [`@media (max-width: 2000px)`]: {
      display: 'none',
	  },
	  '@media (max-width:800px)': {
      display:"block",
      marginLeft:16,
      marginRight:16
	  },
  },
  spContainer:{
    paddingTop: "calc(var(--mantine-header-height, 0px) + 16px)",
    [`@media (max-width: 2000px)`]: {
      paddingTop: "-calc(var(--mantine-header-height, 0px) + 16px)",
	  },
    '@media (max-width:800px)': {
      display:"block",
      marginLeft:16,
      marginRight:16
	  },
  },
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: "yellow" }).background,
    borderBottom: 0,
    height: HEADER_HEIGHT,
    maxHeight: 100,
    marginLeft:-16,
    marginRight:-16,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      display: 'none',
	  },
	  '@media (max-width:800px)': {
      display:"block",
      // marginLeft:16,
      // marginRight:16
	  },
  },
}));



export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter()

  const { classes } = useStyles();
	
  return (
    <>
      <Head>
        <title>Idea Helper</title>
      </Head>

      <div className={classes.pc}>
        <Provider store={store}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: 'light',
              breakpoints: {
                xs: 500,
                sm: 800,
                md: 1000,
                lg: 1200,
                xl: 1400,
              },
            }}
          >
            <AppShell padding="md" 
              navbar={<Navbar width={{base:200}} style={{backgroundColor:"#FFFEF9"}} className={classes.spContainer}><Sidebar></Sidebar></Navbar> } 
             
            >
              <Component {...pageProps} />
            </AppShell>
          </MantineProvider>
        </Provider>
        {/* <div className={classes.container} /> */}
      </div>

        <div className={classes.sp}>
          <Provider store={store}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                /** Put your mantine theme override here */
                colorScheme: 'light',
                breakpoints: {
                  xs: 500,
                  sm: 800,
                  md: 1000,
                  lg: 1200,
                  xl: 1400,
                },
              }}
            >
                <Component {...pageProps} className={classes.spContainer}/>
            </MantineProvider>
          </Provider>
        </div>
    </>
  );
}