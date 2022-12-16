import { Node } from 'reactflow';
import shallow from 'zustand/shallow';

import useAppStore, { AppState } from '../../../store';

export function useBlockClick(node?: Node | undefined) {
  const selector = (state: AppState) => ({
    blockInspectorOpen: state.blockInspectorOpen,
    setBlockInspectorOpen: state.setBlockInspectorOpen,
  });
  const { blockInspectorOpen, setBlockInspectorOpen } = useAppStore(
    selector,
    shallow
  );

  const onClick = () => {
    // Open the block inspector.
    console.log('setting block inspector to open');
    setBlockInspectorOpen(true);
    console.log('blockInspectorOpen', blockInspectorOpen);
  };

  // TODO: Set the selected block in the store. 👈

  return onClick;
}

export default useBlockClick;
