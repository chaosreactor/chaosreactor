import {
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DarkMode,
  Stack,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import React, {
  useRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import shallow from 'zustand/shallow';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/work-sans';

import styles from './block-inspector.module.css';
import { blockData } from '../playfield/blocks';
import chaosTheme from '../../theme';
import useAppStore, { AppState } from '../../store';
import { dispatch, events } from '../../bus';

/* eslint-disable-next-line */
export interface BlockInspectorProps {}

interface FormProps {
  form: React.ElementType<unknown>; // 👈️ type it as React.ElementType
}

const FormWrapper = React.forwardRef((props: FormProps, ref) => {
  // 👇️ component names must start with capital letter
  const { form: FormComponent } = props;
  const TypedFormComponent = FormComponent as ForwardRefExoticComponent<
    PropsWithoutRef<RefAttributes<unknown>> & RefAttributes<unknown>
  >;
  const FormComponentWithRef = React.forwardRef(
    (forwardedProps, forwardedRef) => (
      <TypedFormComponent {...forwardedProps} ref={forwardedRef} />
    )
  );

  return (
    <div>
      <FormComponentWithRef ref={ref} />
    </div>
  );
});

const selector = (state: AppState) => ({
  blockInspectorOpen: state.blockInspectorOpen,
  setBlockInspectorOpen: state.setBlockInspectorOpen,
  selectedBlock: state.selectedBlock,
});

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
  const { blockInspectorOpen, setBlockInspectorOpen, selectedBlock } =
    useAppStore(selector, shallow);

  const focusField = useRef() as React.MutableRefObject<FocusableElement>;

  // Determine the label for the selected block.
  const selectedBlockData = selectedBlock
    ? blockData[selectedBlock.type || '']
    : null;

  const closeDrawer = () => {
    setBlockInspectorOpen(false);
  };

  const blockForm = selectedBlockData?.form || <Card />;

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
            initialFocusRef={focusField}
            variant="inspector"
          >
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
                >
                  <FormWrapper
                    form={blockForm as React.ElementType<unknown>}
                    ref={focusField}
                  />
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={closeDrawer}>
                  Cancel
                </Button>

                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => dispatch(events.blocks.run)}
                >
                  Run block ▶
                </Button>

                <Button
                  colorScheme="blue"
                  type="submit"
                  form="block-inspector-form"
                >
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </DarkMode>
    </ChakraProvider>
  );
}

export default BlockInspector;
