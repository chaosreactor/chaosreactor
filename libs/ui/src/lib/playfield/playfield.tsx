import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import blockTypes from './blocks';
import styles from './playfield.module.css';

/* eslint-disable-next-line */
export interface PlayfieldProps {
  height: string;
  width: string;
}

// Initial playfield setup: a placeholder block which reveals the block
// selector when clicked.
const defaultNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Add first block' },
    position: { x: 0, y: 150 },
    type: 'placeholder',
  },
];

const fitViewOptions = {
  padding: 0.95,
};

export function Playfield(props: PlayfieldProps) {
  const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
  };

  return (
    <div
      id="playfield"
      className={styles['container']}
      style={{ height: props.height, width: props.width, maxHeight: '100%' }}
    >
      <ReactFlow
        defaultNodes={defaultNodes}
        fitView
        fitViewOptions={fitViewOptions}
        minZoom={0.8}
        nodeTypes={blockTypes}
        proOptions={proOptions}
      >
        <Background color="#5c6169" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Playfield;
