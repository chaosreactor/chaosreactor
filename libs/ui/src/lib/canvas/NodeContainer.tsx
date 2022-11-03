import { NodeSpecJSON } from 'behave-graph';
import { PropsWithChildren } from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

import {
  categoryColorMap,
  colors,
} from '../../../vendor/behave-flow/src/util/colors';

import chaosTheme from '../../theme';

import '@fontsource/work-sans';

type NodeProps = {
  title: string;
  category?: NodeSpecJSON['category'];
  selected: boolean;
};

export default function NodeContainer({
  title,
  category = 'None',
  selected,
  children,
}: PropsWithChildren<NodeProps>) {
  let colorName = categoryColorMap[category];
  if (colorName === undefined) {
    colorName = 'red';
  }
  let [backgroundColor, borderColor, textColor] = colors[colorName];
  if (selected) {
    borderColor = 'border-gray-800';
  }
  return (
    <ChakraProvider theme={chaosTheme}>
      <Box as="section" p={{ base: '0' }}>
        <Container maxW="3xl">
          <Box
            bg="#2D3648"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            borderRadius="lg"
            p={{ base: '0' }}
          >
            <Stack spacing="5">
              <Stack spacing="1">
                <Text
                  className={`${backgroundColor} ${textColor}`}
                  fontSize="lg"
                  fontWeight="medium"
                >
                  {title}
                </Text>
              </Stack>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius="lg"
              >
                {children}
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
