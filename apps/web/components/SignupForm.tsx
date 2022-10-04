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
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const ChakraForm = () => {
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

  // Clear the form on successful submitting it
  useEffect(() => {
    if (data?.success === true && !loading) {
      setEmail('');
    }
  }, [data?.success, loading]);

  // Get the url the user is currently visiting.
  // Optional, but enriches the data we have in HubSpot.
  useEffect(() => {
    setPageUri(window.location.href);
  });

  return (
    <ChakraProvider theme={chaosTheme}>
      <Container minW="max-content" px="0" py={{ base: '0' }}>
        <Stack spacing="8">
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
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default ChakraForm;
