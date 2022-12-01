import { NodeProps, useReactFlow } from 'reactflow';

import { uuid } from '../utils';

export function usePlaceholderClick(id: NodeProps['id']) {
  const { getNode, setNodes, setEdges } = useReactFlow();

  const onClick = () => {
    const node = getNode(id);

    if (!node) return;

    // Log the node.
    console.log('node', node);
  };

  return onClick;
}

export default usePlaceholderClick;
