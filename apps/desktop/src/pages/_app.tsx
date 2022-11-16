import type { AppProps } from 'next/app';
import Script from 'next/script';

import 'reactflow/dist/style.css';
import '../App.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
