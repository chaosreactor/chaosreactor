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
import cx from 'classnames';
import { Icon } from '@iconify/react';
import { ChakraProvider } from '@chakra-ui/react';

import chaosTheme from '../../../theme';
import useBlockClick from '../hooks/useBlockClick';
import { BlockData, BlockType } from './index';
import styles from './blocks.module.css';

/* eslint-disable-next-line */
export interface ImageGeneratorBlockProps {
  id: string;
  prompt?: string;
}

export const ImageGeneratorForm: React.FunctionComponent<unknown> = () => {
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
          <Textarea name="prompt" placeholder="Elmo holding a lightsaber" />
        </form>
      </DarkMode>
    </ChakraProvider>
  );
};

export function ImageGeneratorBlock(props: ImageGeneratorBlockProps) {
  const onClick = useBlockClick(props.id);

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
                  {props.prompt || 'Elmo holding a lightsaber'}
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
