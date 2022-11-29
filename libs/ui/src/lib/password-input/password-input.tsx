import { Controller, Control } from 'react-hook-form';
import {
  Button,
  DarkMode,
  FormControl,
  FormLabel,
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
export interface PasswordInputProps {
  control: Control;
  name: string;
  label: string;
}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <Controller
          control={props.control}
          name={props.name}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl id={props.name} isInvalid={invalid} mb={5}>
              <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
              <InputGroup size="md">
                <Input
                  id={props.name}
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  {...field}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          )}
        />
      </DarkMode>
    </ChakraProvider>
  );
}

export default PasswordInput;
