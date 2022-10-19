import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from 'react-icons/fi'
import { Icon } from '@iconify/react';

import { Logo } from './Logo'
import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme'
import '@fontsource/work-sans';
import styles from './nav.module.css';

/* eslint-disable-next-line */
export interface NavProps {}

export function Nav(props: NavProps) {
  const isDesktop = true;

  return (
    <ChakraProvider theme={chaosTheme}>
      <Box className={styles["container"]} as="nav" bg="bg-surface" height="48px" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container maxW="100%">
          <Flex justify="space-between" px={{ base: '0' }} py={{ base: '1' }}>
            <HStack spacing="4">
              <Logo />
            </HStack>

            {isDesktop ? (
              <HStack spacing="4">
                <ButtonGroup variant="ghost" spacing="1">
                  <Button>Data Sources</Button>
                </ButtonGroup>
                <ButtonGroup variant="ghost" spacing="1">
                  <IconButton icon={<Icon icon="noto:left-speech-bubble" />} aria-label="Search" />
                  <IconButton icon={<Icon icon="noto:bell" />} aria-label="Settings" />
                  <IconButton icon={<Icon icon="noto:gear"/>} aria-label="Help Center" />
                </ButtonGroup>
              </HStack>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  )
}


