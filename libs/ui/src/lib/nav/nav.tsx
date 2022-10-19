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
        <Container>
          <Flex justify="space-between" py={{ base: '1' }}>
            <HStack spacing="4">
              <Logo />
            </HStack>

            {isDesktop ? (
              <HStack spacing="4">
                <ButtonGroup variant="ghost" spacing="1">
                  <Button>Data Sources</Button>
                </ButtonGroup>
                <ButtonGroup variant="ghost" spacing="1">
                  <IconButton icon={<FiSearch fontSize="1.25rem" />} aria-label="Search" />
                  <IconButton icon={<FiSettings fontSize="1.25rem" />} aria-label="Settings" />
                  <IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Help Center" />
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


