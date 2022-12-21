import useAppStore, { AppState } from '../../../../../libs/ui/src/store';
import { Node } from 'reactflow';
import shallow from 'zustand/shallow';
import { trpc } from '../../utils/trpc';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';
import { useEffect, useState } from 'react';

import { events, useBus } from '../../../../../libs/ui/src/bus';

/* eslint-disable-next-line */
export interface DoltStorageProps {}

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
 * Listens to changes to the store and updates the database as necessary.
 */
export function DoltStorage(props: DoltStorageProps) {
  const { updateNode, nodes, setNodes } = useAppStore(selector, shallow);

  const { data } = trpc.blocksAll.useQuery(
    {},
    {
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const [isInitialRender, setIsInitialRender] = useState(true);

  // Load this reactor's blocks from the database on initial render.
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
  const { mutate: updateBlock } = trpc.updateBlock.useMutation();

  // Handle block addition.
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

  // Handle block update.
  useBus(events.blocks.update, (input) => {
    const data = input['payload'];
    const { type, position, data: blockData } = data.body;

    const updatedBlock: UpdateBlockInput = {
      params: {
        blockId: data.params.blockId,
      },
      body: {
        type: type,
        x: position.x,
        y: position.y,
        data: blockData,
      },
    };

    // Update the block in Dolt via tRPC.
    const updateBlockResult = updateBlock(updatedBlock);
    console.log(updateBlockResult);
  });

  return null;
}

export default DoltStorage;
