import ReactFlow, {
  Controls,
  ControlButton,
  Background,
  BackgroundVariant,
} from 'reactflow';
import shallow from 'zustand/shallow';
import 'reactflow/dist/style.css';
import { useMemo } from 'react';

import useAppStore, { AppState } from '../../store';
import { events, dispatch } from '../../bus';
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
  addNode: state.addNode,
  getNode: state.getNode,
  updateNode: state.updateNode,
  setNodes: state.setNodes,
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

/**
 * Trigger a reactor run.
 */
function runReactor() {
  // Dispatch a reactor run event.
  dispatch({
    type: events.reactors.run,
    payload: {
      reactorId: '1',
    },
  });
}

export function Playfield(props: PlayfieldProps) {
  // Memoize block types.
  // @see https://reactflow.dev/docs/guides/troubleshooting/#it-looks-like-you-have-created-a-new-nodetypes-or-edgetypes-object-if-this-wasnt-on-purpose-please-define-the-nodetypesedgetypes-outside-of-the-component-or-memoize-them
  const nodeTypes = useMemo(() => blockTypes, []);

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
      className={styles['playfield']}
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
        nodeTypes={nodeTypes}
        proOptions={proOptions}
      >
        <Background color="#5c6169" variant={BackgroundVariant.Dots} />
        <Controls>
          <ControlButton
            onClick={runReactor}
            className={styles['control-button']}
          >
            <div>▶</div>
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default Playfield;
