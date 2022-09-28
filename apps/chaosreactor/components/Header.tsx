import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export const Header = () => (
  <Box as="section" bg="bg-surface" py={{ base: '16', md: '24' }}>
    <Container>
      <Stack spacing={{ base: '4', md: '6' }} align="center" textAlign="center">
        <Stack spacing="3">
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="medium"
            color="accent"
          >
            Say hello to!!!!
          </Text>
          <Heading
            size={useBreakpointValue({ base: 'md', md: 'lg' })}
            fontWeight="semibold"
          >
            Chaos Reactor 🧪
          </Heading>
        </Stack>
        <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
          Get early access to 210+ components and free updates.
        </Text>
      </Stack>
    </Container>
  </Box>
);

export default Header;
