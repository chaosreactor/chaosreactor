import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  Node,
} from 'reactflow';
import shallow from 'zustand/shallow';
import 'reactflow/dist/style.css';

import useAppStore, {AppState} from '../../store';
import blockTypes from './blocks';
import styles from './playfield.module.css';

/* eslint-disable-next-line */
export interface PlayfieldProps {
  height: string;
  width: string;
}

const fitViewOptions = {
  padding: 0.95,
};

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export function Playfield(props: PlayfieldProps) {
  const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
  };
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useAppStore(
    selector,
    shallow
  );

  return (
    <div
      id="playfield"
      className={styles['container']}
      style={{ height: props.height, width: props.width, maxHeight: '100%' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
