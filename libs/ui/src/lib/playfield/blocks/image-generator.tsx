import {
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  FormControl,
  Heading,
  DarkMode,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Node } from 'reactflow';
import React, { useCallback, MutableRefObject, useEffect } from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import shallow from 'zustand/shallow';
import { Icon } from '@iconify/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import chaosTheme from '../../../theme';
import useBlockClick from '../hooks/useBlockClick';
import { BlockData, BlockType } from './index';
import useAppStore, { AppState } from '../../../store';
import styles from './blocks.module.css';

/* eslint-disable-next-line */
export interface ImageGeneratorBlockProps {
  id?: string;
}

const selector = (state: AppState) => ({
  getNode: state.getNode,
  selectedBlock: state.selectedBlock,
  updateNode: state.updateNode,
});

export const ImageGeneratorForm = React.forwardRef((props, ref) => {
  const { selectedBlock, updateNode } = useAppStore(selector, shallow);

  const {
    handleSubmit,
    setFocus,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      prompt: selectedBlock?.data?.prompt,
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedBlock) return;

    const updatedNode = {
      params: {
        blockId: selectedBlock.id,
      },
      body: {
        ...selectedBlock,
        data: {
          ...selectedBlock.data,
          prompt: e.target.value,
        },
      },
    };

    updateNode(updatedNode);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(debounce(onChange, 300), []);

  const { ref: internalRef, ...rest } = register('prompt', {
    onChange: debouncedOnChange,
  });

  /**
   * Set the focus on the first field. Though we do a lot of work to forward the ref to Chakra's
   * `initialFocusRef` option on `BlockInspector`, it doesn't seem to work. So we're doing this instead.
   */
  useEffect(() => {
    if (selectedBlock) setFocus('prompt');
  });

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <form
          id="block-inspector-form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('submitted');
          }}
        >
          <FormControl>
            <FormLabel htmlFor="prompt">Prompt</FormLabel>
            <Textarea
              {...rest}
              placeholder="Elmo holding a lightsaber"
              tabIndex={0}
              ref={(e) => {
                internalRef(e);
                if (ref) {
                  (
                    ref as MutableRefObject<HTMLTextAreaElement | null>
                  ).current = e;
                }
              }}
            />
          </FormControl>
        </form>
      </DarkMode>
    </ChakraProvider>
  );
});

export function ImageGeneratorBlock(props: ImageGeneratorBlockProps) {
  const onClick = useBlockClick(props.id);

  const { getNode } = useAppStore(selector, shallow);
  const node = getNode(props.id as string) as Node;

  const nodeClasses = cx(styles['node'], styles['imageGenerator']);

  return (
    <div onClick={onClick} className={nodeClasses}>
      <ChakraProvider theme={chaosTheme}>
        <DarkMode>
          <Card bg="#2D3648" borderRadius="md" w={382} p={4}>
            <CardHeader>
              <Heading size="xs">
                <Icon icon="noto:framed-picture" />
                {IMAGE_GENERATOR_DATA.label}
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="0">
                <Text textAlign="left" w="100%" fontSize="xs" mb="8px">
                  Prompt
                </Text>

                <Text textAlign="left" w="100%" fontSize="md" as="i">
                  {node?.data?.prompt || 'Elmo holding a lightsaber'}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </DarkMode>
      </ChakraProvider>
    </div>
  );
}

export const IMAGE_GENERATOR_DATA: BlockData = {
  type: 'imageGenerator' as BlockType,
  label: 'Generate image',
  form: ImageGeneratorForm,
};
