import { useForm, SubmitHandler } from 'react-hook-form';
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
  Stack,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/work-sans';
import { useEffect } from 'react';

import { PasswordInput } from '../password-input/password-input';
import chaosTheme from '../../theme';
import styles from './settings-drawer.module.css';

/* eslint-disable-next-line */
export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsFormValues = {
  'stable-diffusion-api-key': string;
};

export function SettingsDrawer(props: SettingsDrawerProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>();

  useEffect(() => {
    invoke('get_api_key', { key: 'stableDiffusionApiKey' }).then((apiKey) => {
      const key = apiKey as string;
      setValue('stable-diffusion-api-key', key);
    });
  }, [setValue]);

  const onSubmit: SubmitHandler<SettingsFormValues> = async (
    data: SettingsFormValues
  ) => {
    await invoke('set_api_key', {
      key: 'stableDiffusionApiKey',
      value: data['stable-diffusion-api-key'],
    });
    props.onClose();
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
