import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DarkMode,
  Stack,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/work-sans';

import styles from './block-inspector.module.css';
import { blockData } from '../playfield/blocks';
import chaosTheme from '../../theme';
import useAppStore, { AppState } from '../../store';

/* eslint-disable-next-line */
export interface BlockInspectorProps {}

/**
 * The block inspector is a drawer that appears on the right side of the screen
 * when a block is selected. It allows the user to edit the properties of the
 * block.
 *
 * This drawer is a bit different than the normal Chakra UI drawer, in that it
 * is not a modal.
 *
 * @see https://github.com/chakra-ui/chakra-ui/issues/2893
 */
export function BlockInspector(props: BlockInspectorProps) {
  const selector = (state: AppState) => ({
    blockInspectorOpen: state.blockInspectorOpen,
    setBlockInspectorOpen: state.setBlockInspectorOpen,
    selectedBlock: state.selectedBlock,
  });
  const { blockInspectorOpen, setBlockInspectorOpen, selectedBlock } =
    useAppStore(selector, shallow);

  // Determine the label for the selected block.
  const selectedBlockData = selectedBlock
    ? blockData[selectedBlock.type || '']
    : null;
  console.log('selectedBlockData', selectedBlockData);

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
            trapFocus={false}
            blockScrollOnMount={false}
            closeOnOverlayClick={false}
            variant="inspector"
          >
            <form noValidate>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  {selectedBlockData?.label ?? 'Block Inspector'}
                </DrawerHeader>
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
