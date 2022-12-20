import { NodeProps, Node } from 'reactflow';
import shallow from 'zustand/shallow';

import useAppStore, { AppState } from '../../../store';

export function useBlockClick(id: NodeProps['id']) {
  const selector = (state: AppState) => ({
    getNode: state.getNode,
    setBlockInspectorOpen: state.setBlockInspectorOpen,
    setSelectedBlock: state.setSelectedBlock,
  });
  const { getNode, setBlockInspectorOpen, setSelectedBlock } = useAppStore(
    selector,
    shallow
  );

  const node = getNode(id);

  console.log('Node clicked', node);

  const onClick = () => {
    // Set the selected block.
    setSelectedBlock(node as Node);

    // Open the block inspector.
    setBlockInspectorOpen(true);
  };

  // TODO: Set the selected block in the store. 👈

  return onClick;
}

export default useBlockClick;
