import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
// pages/_app.js
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import '@fontsource/work-sans';
import { Chakra } from '../lib/chakra';

function CustomApp({ Component, pageProps }: AppProps) {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
      fonts: {
        heading: 'Work Sans, -apple-system, system-ui, sans-serif',
        body: 'Work, -apple-system, system-ui, sans-serif',
      },
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    theme
  );

  return (
    <ChakraProvider theme={myTheme}>
      <Head>
        <title>Welcome to chaosreactor!</title>
      </Head>
      <main className="app">
        <Chakra cookies={pageProps.cookies}>
          <Component {...pageProps} />
        </Chakra>
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
