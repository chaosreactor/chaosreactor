import { theme } from '@chakra-ui/pro-theme';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export { default as fonts } from './fonts';
export { default as shadows } from './shadows';
export { default as styles } from './styles';
export { default as semanticTokens } from './tokens';

theme['colors']['gray'][700] = '#2D3648';
theme['colors']['gray'][800] = '#1A202C';

const chaosTheme: ThemeConfig = extendTheme(theme, {
  colors: {
    ...theme['colors'],
    brand: theme['colors']['green'],
  },
  fonts: {
    heading: '"Work Sans", -apple-system, system-ui, sans-serif',
    body: '"Work Sans", -apple-system, system-ui, sans-serif',
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
  components: {
    Drawer: {
      variants: {
        inspector: {
          parts: ['dialog, dialogContainer'],
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

export default chaosTheme;
