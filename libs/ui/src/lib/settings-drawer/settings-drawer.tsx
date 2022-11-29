import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DarkMode,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from '@chakra-ui/react';

import { PasswordInput } from '../password-input/password-input';
import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme';
import '@fontsource/work-sans';
import styles from './settings-drawer.module.css';

/* eslint-disable-next-line */
export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  useStorage: (key: any, defaultValue: any, storeName?: string) => any[];
}

type FormValues = {
  stableDiffusionApiKey: string;
};

export function SettingsDrawer(props: SettingsDrawerProps) {
  const [stableDiffusionApiKey, setStableDiffusionApiKey] = props.useStorage(
    'stableDiffusionApiKey',
    ''
  );

  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values,
      errors: {},
      defaultValues: {
        stableDiffusionApiKey: stableDiffusionApiKey,
      },
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
  });

  // Store settings in the settings file.
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // setStableDiffusionApiKey(data.stableDiffusionApiKey);
  };

  return (
    <ChakraProvider theme={chaosTheme}>
      <DarkMode>
        <div className={styles['container']}>
          <Drawer
            placement="right"
            onClose={props.onClose}
            isOpen={props.isOpen}
            size="md"
          >
            <DrawerOverlay />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Settings</DrawerHeader>
                <DrawerBody>
                  <Stack
                    spacing="5"
                    px={{ base: '4', md: '6' }}
                    py={{ base: '5', md: '6' }}
                  >
                    <PasswordInput
                      name="stable-diffusion-api-key"
                      label="Stable Diffusion API Key"
                      control={control}
                    />
                  </Stack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={props.onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </form>
          </Drawer>
        </div>
      </DarkMode>
    </ChakraProvider>
  );
}

export default SettingsDrawer;
