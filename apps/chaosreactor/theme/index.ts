import { theme } from '@chakra-ui/pro-theme';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export { default as fonts } from './fonts';
export { default as shadows } from './shadows';
export { default as styles } from './styles';
export { default as semanticTokens } from './tokens';

const chaosTheme = extendTheme(theme, {
  colors: { ...theme.colors, brand: theme.colors.purple },
  fonts: {
    heading: 'Work Sans, -apple-system, system-ui, sans-serif',
    body: 'Work, -apple-system, system-ui, sans-serif',
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
});

export default chaosTheme;
