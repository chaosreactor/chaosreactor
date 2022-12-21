import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  DarkMode,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Node } from 'reactflow';
import { useCallback } from 'react';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import shallow from 'zustand/shallow';
import { Icon } from '@iconify/react';
import { ChakraProvider } from '@chakra-ui/react';

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

export const ImageGeneratorForm: React.FunctionComponent<unknown> = (props) => {
  const { selectedBlock, updateNode } = useAppStore(selector, shallow);

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

    console.log('updatedNode', updatedNode);

    updateNode(updatedNode);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(debounce(onChange, 300), []);

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
          <Textarea
            name="prompt"
            placeholder="Elmo holding a lightsaber"
            onChange={debouncedOnChange}
          />
        </form>
      </DarkMode>
    </ChakraProvider>
  );
};

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
