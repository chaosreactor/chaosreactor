import { useState, createRef, useRef, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import dynamic from 'next/dynamic';

import type { Nav as NavType } from '../../../../libs/ui/src/index';
import { Playfield } from '../../../../libs/ui/src/index';
import { trpc } from '../utils/trpc';
import { useStorage, RUNNING_IN_TAURI } from '../utils/store';

// This type represents the props + defaultProps of the above component
// See: https://stackoverflow.com/questions/43230765/typescript-react-access-component-property-types/55005902#comment107210124_55005902
type NavPropsType = JSX.LibraryManagedAttributes<
  typeof NavType,
  React.ComponentProps<typeof NavType>
>;

const Nav = dynamic<NavPropsType>(
  () => import('../../../../libs/ui/src/index').then((mod) => mod.Nav),
  { ssr: false }
);

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  const wrapper = createRef<HTMLDivElement>();

  const reactor = trpc.reactorById.useQuery('1');

  let nav;
  if (RUNNING_IN_TAURI) {
    nav = <Nav useStorage={useStorage} />;
  }

  return (
    <div id="wrapper" ref={wrapper}>
      {nav}
      <Playfield height="100%" width="100%" />
    </div>
  );
}

export default App;
