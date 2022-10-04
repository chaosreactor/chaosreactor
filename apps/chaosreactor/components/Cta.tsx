import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../theme';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import Script from 'next/script';

export const Cta = () => (
  <ChakraProvider theme={chaosTheme}>
    <Container py={{ base: '16', md: '24' }}>
      <Box
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderRadius="xl"
        px={{ base: '6', lg: '16' }}
        py={{ base: '10', lg: '16' }}
      >
        <Stack
          spacing="8"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
        >
          <Stack spacing="4" maxW="2xl">
            <Heading size="sm">Ready to Create?</Heading>
            <Text
              color="muted"
              fontSize={useBreakpointValue({ base: 'lg', lg: 'xl' })}
            >
              Start building your next project with Chaos Reactor. Get started
              by joining our Discord community.
            </Text>
            <div
              data-tf-widget="bjZHACdL"
              data-tf-iframe-props="title=Chaos Reactor Sign-up 🧪"
              data-tf-medium="snippet"
              data-tf-hidden="hubspot_utk=xxxxx,hubspot_page_name=xxxxx,hubspot_page_url=xxxxx,discord_signup=true"
              style={{ width: '100%', height: '500px' }}
            ></div>
          </Stack>
        </Stack>
      </Box>
      <Script src="//embed.typeform.com/next/embed.js"></Script>
    </Container>
  </ChakraProvider>
);

export default Cta;
