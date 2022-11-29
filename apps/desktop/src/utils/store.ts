// @see https://github.com/elibroftw/modern-desktop-app-template/blob/master/src/utils.js
import * as fs from '@tauri-apps/api/fs';
import * as tauriPath from '@tauri-apps/api/path';
import * as os from '@tauri-apps/api/os';
import { currentMonitor, getCurrent } from '@tauri-apps/api/window';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Store } from 'tauri-plugin-store-api';
import packageJson from '../../package.json';
import tauriConfJson from '../../src-tauri/tauri.conf.json';

export const VERSION = packageJson.version;
export const APP_NAME = tauriConfJson.package.productName;
const EXTS = new Set(['.json']);
// save tauri store 1 second after last set
const SAVE_DELAY = 1000;
export const RUNNING_IN_SSG = typeof window === 'undefined';
export const RUNNING_IN_TAURI =
  !RUNNING_IN_SSG && window['__TAURI__'] !== undefined;

const stores = {};

function getTauriStore(filename) {
  if (RUNNING_IN_SSG) return null;

  if (!(filename in stores)) stores[filename] = new Store(filename);
  return stores[filename];
}

export const useStorage = useTauriStore;

export function useTauriStore(key, defaultValue, storeName = 'settings.dat') {
  // storeName is a path that is relative to AppData if not absolute
  const [state, setState] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  // Don't use the store if we're generating server-side.
  if (RUNNING_IN_SSG) return [state, setState, loading];

  // useLayoutEffect will be called before DOM paintings and before useEffect
  useLayoutEffect(() => {
    let allow = true;
    const store = getTauriStore(storeName);
    store
      .get(key)
      .then((value) => {
        if (value === null) throw '';
        if (allow) setState(value);
      })
      .catch(() => {
        store.set(key, defaultValue).then(() => {
          timeoutRef.current = setTimeout(() => store.save(), SAVE_DELAY);
        });
      })
      .then(() => {
        if (allow) setLoading(false);
      });
  }, []);
  // useLayoutEffect does not like Promise return values.
  useEffect(() => {
    const store = getTauriStore(storeName);
    // do not allow setState to be called before data has even been loaded!
    // this prevents overwriting
    if (!loading) {
      clearTimeout(timeoutRef.current);
      store.set(key, state).then(() => {
        timeoutRef.current = setTimeout(() => store.save(), SAVE_DELAY);
      });
    }
  }, [state]);
  return [state, setState, loading];
}
