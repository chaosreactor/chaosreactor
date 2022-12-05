import { NodeProps, useReactFlow } from 'reactflow';

import useAppStore from '../../../store';
import { uuid } from '../utils';

export function usePlaceholderClick(id: NodeProps['id']) {
  const { getNode, setNodes, setEdges } = useReactFlow();

  const setCommandBarOpen = useAppStore((state) => state.setCommandBarOpen);

  const onClick = () => {
    const node = getNode(id);

    if (!node) return;

    // Open the command bar.
    setCommandBarOpen(true);

    // Log the node.
    console.log('node', node);
  };

  return onClick;
}

export default usePlaceholderClick;
