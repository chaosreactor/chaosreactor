import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { DocList } from '../components/DocList';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to Voxable!</title>
      </Head>
      <main className="app" {...pageProps}>
        <DocList {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
