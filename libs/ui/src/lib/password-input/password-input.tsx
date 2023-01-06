import {
  Controller,
  Control,
  FieldValues,
  SubmitHandler,
  DefaultValues,
  FieldError,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';
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
export interface PasswordInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  error?: FieldError | undefined;
  label: string;
}

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
}: PasswordInputProps<T>) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl id={name} isInvalid={invalid} mb={5}>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <InputGroup size="md">
                <Input
                  id={name}
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
