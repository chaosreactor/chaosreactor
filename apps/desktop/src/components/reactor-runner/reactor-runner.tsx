import useAppStore, { AppState } from '../../../../../libs/ui/src/store';
import { Node } from 'reactflow';
import shallow from 'zustand/shallow';
import { trpc } from '../../utils/trpc';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';
import { useEffect, useState } from 'react';

import { events, useBus } from '../../../../../libs/ui/src/bus';

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

export function ReactorRunner(props: {}) {
  const { updateNode, nodes, setNodes } = useAppStore(selector, shallow);

  // Handle block run.
  useBus(events.blocks.run, (input) => {
    console.log('run block', input);
  });

  return null;
}

export default ReactorRunner;
