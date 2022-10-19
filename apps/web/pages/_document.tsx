import chaosTheme from '../../../libs/ui/src/theme';

import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import { Document, PreviewModeScript } from '@makeswift/runtime/next';
import Script from 'next/script';

export default class ChaosReactorDocument extends Document {
  render() {
    return (
      <ChakraProvider theme={chaosTheme}>
        <Html>
          <Head>
            <Script
              src="https://cdn.iubenda.com/cs/ccpa/stub.js"
              strategy="afterInteractive"
            />
            <Script
              src="https://cdn.iubenda.com/cs/iubenda_cs.js"
              strategy="afterInteractive"
            />
            <Script
              id="iubenda-cs-banner"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  var _iub = _iub || [];
                  _iub.csConfiguration = {"ccpaAcknowledgeOnDisplay":true,"consentOnContinuedBrowsing":false,"cookiePolicyInOtherWindow":true,"countryDetection":true,"enableCcpa":true,"enableLgpd":true,"floatingPreferencesButtonDisplay":"bottom-right","gdprAppliesGlobally":false,"invalidateConsentWithoutLog":true,"lang":"en","lgpdAppliesGlobally":false,"perPurposeConsent":true,"siteId":2830078,"whitelabel":false,"cookiePolicyId":32919675,"cookiePolicyUrl":"https://www.voxable.design/terms","privacyPolicyUrl":"https://www.voxable.design/privacy", "banner":{ "acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":"https://s.mkswft.com/RmlsZTphOTUxN2VjOS1iZGZjLTQwNWItYjc4Zi0xNjY5YzVjZDEwYzk=/Logo@2x.svg","position":"float-bottom-center","rejectButtonDisplay":true }};
                `,
              }}
            />
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
