import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  DarkMode,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { Node } from 'reactflow';
import { Icon } from '@iconify/react';
import { ChakraProvider } from '@chakra-ui/react';

import chaosTheme from '../../../theme';
import useBlockClick from '../hooks/useBlockClick';

/* eslint-disable-next-line */
export interface ImageGeneratorBlockProps {
  id: string;
  prompt?: string;
}

export const IMAGE_GENERATOR_DATA = {
  type: 'imageGenerator',
  label: 'Generate image',
}

export function ImageGeneratorBlock(props: ImageGeneratorBlockProps) {
  const onClick = useBlockClick(props.id);

  return (
    <div onClick={onClick}>
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
