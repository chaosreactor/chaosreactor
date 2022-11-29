import {
  Box,
  Button,
  ButtonGroup,
  Container,
  DarkMode,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Icon } from '@iconify/react';

import { Logo } from './Logo';
import { SettingsDrawer } from '../settings-drawer/settings-drawer';
import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme';
import '@fontsource/work-sans';
import styles from './nav.module.css';

/* eslint-disable-next-line */
export interface NavProps {
  useStorage: (key: any, defaultValue: any, storeName?: string) => any[];
}

export function Nav(props: NavProps) {
  const isDesktop = true;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <Box
          id="nav"
          className={styles['#nav']}
          as="nav"
          bg="#2D3648"
          height="48px"
          boxShadow={useColorModeValue('sm', 'sm-dark')}
        >
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
                    <IconButton
                      icon={<Icon icon="noto:left-speech-bubble" />}
                      aria-label="Comments"
                    />
                    <IconButton
                      icon={<Icon icon="noto:bell" />}
                      aria-label="Notifications"
                    />
                    <IconButton
                      icon={<Icon icon="noto:gear" />}
                      aria-label="Settings"
                      onClick={onOpen}
                    />
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

          <SettingsDrawer
            isOpen={isOpen}
            onClose={onClose}
            useStorage={props.useStorage}
          />
        </Box>
      </DarkMode>
    </ChakraProvider>
  );
}
