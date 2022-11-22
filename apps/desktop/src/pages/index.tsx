import { useCallback, useState, useEffect, createRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import subscribe from 'subscribe-event';
import { useDebouncedCallback } from 'use-debounce';

import { Nav, Playfield } from '../../../../libs/ui/src/index';
import { trpc } from '../utils/trpc';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  const wrapper = createRef<HTMLDivElement>();

  const height = '100%';
  const width = '100%';

  const [dimensions, setDimensions] = useState({
    height: height,
    width: width,
  });

  const handleResize = useDebouncedCallback(() => {
    setDimensions({
      height: height,
      width: width,
    });
  }, 200);

  // Set the initial Playfield dimensions.
  useEffect(() => {
    // Set the Playfield dimensions based on window size.
    const htmlElement = document.getElementsByTagName('html')[0];
    const currentWidth = htmlElement.clientWidth;
    const currentHeight = htmlElement.clientHeight;

    console.log('Initial dimensions: ', currentWidth, currentHeight);

    setDimensions({
      height: `${currentHeight.toString()}px`,
      width: `${currentWidth.toString()}px`,
    });
  }, []);

  useEffect(() => {
    // Resize the Playfield on window resize.
    const unsubscribe = subscribe(window, 'resize', handleResize);

    return () => {
      unsubscribe();
    };
  });

  const reactor = trpc.reactorById.useQuery('1');

  return (
    <div id="wrapper" ref={wrapper}>
      <Nav />
      <Playfield height={height} width={width} />
    </div>
  );
}

export default App;
