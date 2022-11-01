import type { AppProps } from 'next/app';
import Script from 'next/script';

import 'reactflow/dist/style.css';
import '../../../../libs/ui/vendor/behave-flow/src/index.css';
import '../App.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://cdn.tailwindcss.com/" />
      <Component {...pageProps} />;
    </>
  );
}
