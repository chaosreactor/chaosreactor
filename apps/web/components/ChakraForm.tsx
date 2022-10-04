import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../theme';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';

const ChakraForm = () => (
  <ChakraProvider theme={chaosTheme}>
    <Container minW="max-content" px="0" py={{ base: '0' }}>
      <Stack spacing="5">
        <FormControl>
          <FormLabel color="white" htmlFor="name">
            First name
          </FormLabel>
          <Input id="first_name" type="text" />
        </FormControl>
        <FormControl>
          <FormLabel color="white" htmlFor="name">
            Last name
          </FormLabel>
          <Input id="last_name" type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white" htmlFor="email">
            Email
          </FormLabel>
          <Input id="email" type="email" />
        </FormControl>
        <Button fontWeight="bold" textTransform="capitalize" variant="primary">
          Sign up
        </Button>
      </Stack>
    </Container>
  </ChakraProvider>
);

export default ChakraForm;
