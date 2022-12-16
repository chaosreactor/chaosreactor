import styles from './block-inspector.module.css';
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
  Stack,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/work-sans';

import chaosTheme from '../../theme';
import useAppStore, { AppState } from '../../store';

/* eslint-disable-next-line */
export interface BlockInspectorProps {
  blockTypeLabel?: string;
}

export function BlockInspector(props: BlockInspectorProps) {
  const selector = (state: AppState) => ({
    blockInspectorOpen: state.blockInspectorOpen,
    setBlockInspectorOpen: state.setBlockInspectorOpen,
  });
  const { blockInspectorOpen, setBlockInspectorOpen } = useAppStore(
    selector,
    shallow
  );

  console.log('blockInspectorOpen from inspector', blockInspectorOpen);

  const closeDrawer = () => {
    setBlockInspectorOpen(false);
  };

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <div className={styles['container']}>
          <Drawer
            placement="right"
            onClose={closeDrawer}
            isOpen={blockInspectorOpen}
            size="md"
          >
            <DrawerOverlay />
            <form noValidate>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{props.blockTypeLabel}</DrawerHeader>
                <DrawerBody>
                  <Stack
                    spacing="5"
                    px={{ base: '4', md: '6' }}
                    py={{ base: '5', md: '6' }}
                  ></Stack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={closeDrawer}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </form>
          </Drawer>
        </div>
      </DarkMode>
    </ChakraProvider>
  );
}

export default BlockInspector;
