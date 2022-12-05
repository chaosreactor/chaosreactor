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
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import chaosTheme from '../../../theme';

/* eslint-disable-next-line */
export interface ImageGeneratorBlockProps {}

export function ImageGeneratorBlock(props: ImageGeneratorBlockProps) {
  return (
    <div>
      <ChakraProvider theme={chaosTheme}>
        <DarkMode>
          <Card bg="#2D3648" borderRadius="md" w={382} p={4}>
            <CardHeader>
              <Heading size="xs">Generate image</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Text mb="8px">
                  Prompt: <em>elmo holding a lightsaber</em>
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </DarkMode>
      </ChakraProvider>
    </div>
  );
}
