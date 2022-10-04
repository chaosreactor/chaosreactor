import { Chakra } from '../lib/chakra';
import chaosTheme from '../theme';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import { Document, PreviewModeScript } from '@makeswift/runtime/next';

export default class ChaosReactorDocument extends Document {
  render() {
    return (
      <ChakraProvider theme={chaosTheme}>
        <Html>
          <Head>
            <PreviewModeScript isPreview={this.props.__NEXT_DATA__.isPreview} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </ChakraProvider>
    );
  }
}
