import { useState, createRef, useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import DoltStorage from '../components/dolt-storage/dolt-storage';
import { Nav, Playfield, CommandBar } from '../../../../libs/ui/src/index';
import useAppStore, { AppState } from '../../../../libs/ui/src/store';
import Dolt from '@chaosreactor/trpc/db/dolt';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  const nodesRef = useRef(useAppStore.getState().nodes);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference.
  useEffect(
    () =>
      // Update any changed nodes in the database.
      useAppStore.subscribe(
        (state) => state.nodes,
        (state, prevState) => {
          console.log('new state', state);
          console.log('prev state', prevState);
          nodesRef.current = state;
          return state;
        }
      ),
    []
  );

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  const wrapper = createRef<HTMLDivElement>();

  return (
    <div id="wrapper" ref={wrapper}>
      <DoltStorage />
      <CommandBar />
      <Nav />
      <Playfield height="100%" width="100%" />
    </div>
  );
}

export default App;
