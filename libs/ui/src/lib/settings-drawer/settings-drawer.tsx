import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DarkMode,
  Input,
} from '@chakra-ui/react';

import { PasswordInput } from '../password-input/password-input';
import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme';
import '@fontsource/work-sans';
import styles from './settings-drawer.module.css';

/* eslint-disable-next-line */
export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer(props: SettingsDrawerProps) {
  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <div className={styles['container']}>
          <Drawer
            placement="right"
            onClose={props.onClose}
            isOpen={props.isOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Settings</DrawerHeader>

              <DrawerBody>
                <PasswordInput />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </DarkMode>
    </ChakraProvider>
  );
}

export default SettingsDrawer;
