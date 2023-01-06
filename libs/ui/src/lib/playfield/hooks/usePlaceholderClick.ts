import { NodeProps, useReactFlow } from 'reactflow';

import useAppStore from '../../../store';

export function usePlaceholderClick(id: NodeProps['id']) {

  const setCommandBarOpen = useAppStore((state) => state.setCommandBarOpen);

  const onClick = () => {
    // Open the command bar.
    setCommandBarOpen(true);
  };

  return onClick;
}

export default usePlaceholderClick;
