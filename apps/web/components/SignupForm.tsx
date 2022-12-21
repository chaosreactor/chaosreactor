import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../../libs/ui/src/theme';
import {
  Box,
  Button,
  Container,
  DarkMode,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const SignupForm = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [pageUri, setPageUri] = useState<string>();

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: '/api/emailSignup',
      method: 'POST',
      data: { email, firstName, lastName, pageUri },
    },
    {
      manual: true,
    }
  );

  let rightPanel;
  if (data) {
    rightPanel = <>
      <Text fontSize="2xl" fontWeight="medium" color="white">
        Thank you!
      </Text>
      <Text fontSize="xl" color="muted">
        Check your email to confirm your subscription.
      </Text>
    </>;
  } else {
    rightPanel = <>
      <FormControl>
        <FormLabel color="white" htmlFor="firstName">
          First name
        </FormLabel>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="white" htmlFor="lastName">
          Last name
        </FormLabel>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel color="white" htmlFor="email">
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="me@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <Button
        fontWeight="bold"
        textTransform="capitalize"
        variant="primary"
        type={'submit'}
        onClick={() => refetch()}
        disabled={loading}
      >
        Sign up
      </Button>
    </>;
  }

  return (
    <ChakraProvider theme={chaosTheme}>
      <Container minW="max-content" px="0" py={{ base: '0' }}>
        <Stack spacing="8">
          { rightPanel }
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default SignupForm;
