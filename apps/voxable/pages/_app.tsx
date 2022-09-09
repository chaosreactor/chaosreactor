import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.css';
import { DocList } from '../components/DocList';
import { Nav } from '@voxable/ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to Voxable!</title>
      </Head>
      <main className="app" {...pageProps}>
        <Nav title="Voxable">
          <DocList {...pageProps} />
        </Nav>
      </main>
    </ApolloProvider>
  );
}

export default CustomApp;
