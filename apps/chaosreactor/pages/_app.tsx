import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
// pages/_app.js
import {
  ChakraProvider,
} from '@chakra-ui/react';
import chaosTheme from '../theme';
import '@fontsource/work-sans';
import { Chakra } from '../lib/chakra';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chaosTheme}>
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
