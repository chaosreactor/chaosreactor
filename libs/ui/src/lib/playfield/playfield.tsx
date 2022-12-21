import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  Node,
} from 'reactflow';
import shallow from 'zustand/shallow';
import 'reactflow/dist/style.css';
import { useEffect, useMemo, useState } from 'react';

import { events, useBus } from '../../bus';
import useAppStore, { AppState } from '../../store';
import blockTypes from './blocks';
import styles from './playfield.module.css';
import { trpc } from '../../utils/trpc';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';

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

export function Playfield(props: PlayfieldProps) {
  // Memoize block types.
  // @see https://reactflow.dev/docs/guides/troubleshooting/#it-looks-like-you-have-created-a-new-nodetypes-or-edgetypes-object-if-this-wasnt-on-purpose-please-define-the-nodetypesedgetypes-outside-of-the-component-or-memoize-them
  const nodeTypes = useMemo(() => blockTypes, []);

  const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
  };

  const {
    updateNode,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
  } = useAppStore(selector, shallow);

  const { isLoading, isError, data, error } = trpc.blocksAll.useQuery(
    {},
    {
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const [isInitialRender, setIsInitialRender] = useState(true);

  // Load this reactor's blocks from the database.
  useEffect(() => {
    if (data && isInitialRender) {
      setIsInitialRender(false);

      // Collect the blocks into an array of Nodes.
      const newNodes = data.blocks.map((block) => {
        const node: Node = {
          id: block.id.toString(),
          type: block.type,
          position: { x: block.x, y: block.y },
          data: block.data,
        };

        return node;
      });

      // Update the nodes in the store (if there are any).
      if (newNodes.length) setNodes(newNodes);
    }
  }, [data, isInitialRender, setNodes]);

  const { mutate: createBlock } = trpc.createBlock.useMutation();

  // Handle block addition event.
  useBus(events.blocks.add, (input) => {
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

      // Update the placeholder block in the playfield store.
      updateNode(updatedBlock as UpdateBlockInput);

      // Create the block via tRPC.
      const newBlock = {
        id: placeholder.id,
        type: input['payload'].blockType,
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
        nodeTypes={nodeTypes}
        proOptions={proOptions}
      >
        <Background color="#5c6169" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Playfield;
