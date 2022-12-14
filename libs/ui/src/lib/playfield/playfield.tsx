import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import shallow from 'zustand/shallow';
import 'reactflow/dist/style.css';

import { events, useBus } from '../../bus';
import useAppStore, { AppState } from '../../store';
import blockTypes from './blocks';
import styles from './playfield.module.css';
import { trpc } from '../../utils/trpc';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';
import { useEffect } from 'react';

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

  const { updateNode, nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useAppStore(selector, shallow);

  const reactor = trpc.reactorById.useQuery('1');

  useEffect(() => {
    console.log('Playfield: Reactor data changed', reactor.data);
  }, [reactor]);

  // Handle block addition event.
  const { mutate: createBlock } = trpc.createBlock.useMutation();

  useBus(events.blocks.add, (input) => {
    console.log('Playfield: Add block', input);

    // If there is a placeholder block present, replace it.
    const placeholder = nodes.find((node) => node.type === 'placeholder');

    if (placeholder) {
      // Update the placeholder block in the client-side store.
      const updatedBlock = {
        params: {
          blockId: placeholder.id,
        },
        body: {
          type: 'imageGenerator',
          x: placeholder.position.x,
          y: placeholder.position.y,
        },
      };

      updateNode(updatedBlock as UpdateBlockInput);

      // Create the block via tRPC.
      const newBlock = {
        id: placeholder.id,
        type: input.payload.blockType,
        x: placeholder.position.x,
        y: placeholder.position.y,
      };

      const createBlockResult = createBlock(newBlock as CreateBlockInput);
      console.log(createBlockResult);
    }
  });

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
