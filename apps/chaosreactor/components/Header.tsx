import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../theme';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export const Header = () => (
  <ChakraProvider theme={chaosTheme}>
    <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }}>
      <Container>
        <Stack
          spacing={{ base: '4', md: '6' }}
          align="center"
          textAlign="center"
        >
          <Stack spacing="3">
            <Text
              fontSize={{ base: 'lg', md: 'md' }}
              fontWeight="medium"
              color="accent"
            >
              Say hello to...
            </Text>
            <Heading
              size={useBreakpointValue({ base: '4xl', md: 'lg' })}
              fontWeight="semibold"
            >
              Chaos Reactor 🧪
            </Heading>
          </Stack>
          <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
            An open source, community-led platform for building anything with
            words.
          </Text>
        </Stack>
      </Container>
    </Box>
  </ChakraProvider>
);

export default Header;
