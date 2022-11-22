import {
  Button,
  DarkMode,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme';
import '@fontsource/work-sans';
import styles from './password-input.module.css';

/* eslint-disable-next-line */
export interface PasswordInputProps {}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </DarkMode>
    </ChakraProvider>
  );
}

export default PasswordInput;
