import { useForm } from 'react-hook-form';
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

import { PasswordInput } from '../password-input/password-input';
import { ChakraProvider } from '@chakra-ui/react';
import chaosTheme from '../../theme';
import '@fontsource/work-sans';
import styles from './settings-drawer.module.css';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer(props: SettingsDrawerProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      'stable-diffusion-api-key': '',
    },
  });

  useEffect(() => {
    invoke('get_api_key', { key: 'stableDiffusionApiKey' }).then((apiKey) => {
      const key = apiKey as string;
      setValue('stable-diffusion-api-key', key);
    });
  }, []);

  const onSubmit = async (data: never) => {
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
