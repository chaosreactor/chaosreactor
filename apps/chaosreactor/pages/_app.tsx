import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
// pages/_app.js
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import '@fontsource/work-sans';

function CustomApp({ Component, pageProps }: AppProps) {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
      fonts: {
        heading: 'Work Sans, -apple-system, system-ui, sans-serif',
        body: 'Work Sans, -apple-system, system-ui, sans-serif',
      },
    },
    theme
  );

  return (
    <ChakraProvider theme={myTheme}>
      <Head>
        <title>Welcome to chaosreactor!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
