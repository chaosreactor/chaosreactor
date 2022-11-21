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

  const height = wrapper.current?.style.height || '100vh';
  const width = wrapper.current?.style.width || '100vw';

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

  useEffect(() => {
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
