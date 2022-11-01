import { customNodeTypes } from './customNodeTypes';

import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  OnConnectStartParams,
  useEdgesState,
  useNodesState,
  XYPosition,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { behaveToFlow } from '../../../vendor/behave-flow/src/transformers/behaveToFlow';
import Controls from '../../../vendor/behave-flow/src/components/Controls';
import rawGraphJSON from '../../../vendor/behave-flow/src/graph.json';
import { GraphJSON } from 'behave-graph';
import NodePicker from '../../../vendor/behave-flow/src/components/NodePicker';
import { getNodePickerFilters } from '../../../vendor/behave-flow/src/util/getPickerFilters';
import { calculateNewEdge } from '../../../vendor/behave-flow/src/util/calculateNewEdge';

const graphJSON = rawGraphJSON as GraphJSON;

const [initialNodes, initialEdges] = behaveToFlow(graphJSON);

function Flow() {
  const [nodePickerVisibility, setNodePickerVisibility] =
    useState<XYPosition>();
  const [lastConnectStart, setLastConnectStart] =
    useState<OnConnectStartParams>();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === null) return;
      if (connection.target === null) return;

      const newEdge = {
        id: uuidv4(),
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      };
      onEdgesChange([
        {
          type: 'add',
          item: newEdge,
        },
      ]);
    },
    [onEdgesChange]
  );

  const handleAddNode = useCallback(
    (nodeType: string, position: XYPosition) => {
      closeNodePicker();
      const newNode = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: {},
      };
      onNodesChange([
        {
          type: 'add',
          item: newNode,
        },
      ]);

      if (lastConnectStart === undefined) return;

      // add an edge if we started on a socket
      const originNode = nodes.find(
        (node) => node.id === lastConnectStart.nodeId
      );
      if (originNode === undefined) return;
      onEdgesChange([
        {
          type: 'add',
          item: calculateNewEdge(
            originNode,
            nodeType,
            newNode.id,
            lastConnectStart
          ),
        },
      ]);
    },
    [lastConnectStart, nodes, onEdgesChange, onNodesChange]
  );

  const handleStartConnect = (
    e: ReactMouseEvent,
    params: OnConnectStartParams
  ) => {
    setLastConnectStart(params);
  };

  const handleStopConnect = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('react-flow__pane')) {
      setNodePickerVisibility({ x: e.clientX, y: e.clientY });
    } else {
      setLastConnectStart(undefined);
    }
  };

  const closeNodePicker = () => {
    setLastConnectStart(undefined);
    setNodePickerVisibility(undefined);
  };

  const handlePaneContextMenu = (e: ReactMouseEvent) => {
    e.preventDefault();
    setNodePickerVisibility({ x: e.clientX, y: e.clientY });
  };

  const [RenderedFlow, setRenderedFlow] = useState(<div></div>);

  useEffect(() => {
    const handlePaneClick = () => closeNodePicker();

    setRenderedFlow(
      <ReactFlow
        nodeTypes={customNodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={handleStartConnect}
        onConnectEnd={handleStopConnect}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
        onPaneClick={handlePaneClick}
        onPaneContextMenu={handlePaneContextMenu}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Lines}
          color="#2a2b2d"
          style={{ backgroundColor: '#1a202c' }}
        />
        {nodePickerVisibility && (
          <NodePicker
            position={nodePickerVisibility}
            filters={getNodePickerFilters(nodes, lastConnectStart)}
            onPickNode={handleAddNode}
            onClose={closeNodePicker}
          />
        )}
      </ReactFlow>
    );
  }, [
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodePickerVisibility,
    lastConnectStart,
    handleAddNode,
  ]);

  return RenderedFlow;
}

export function Canvas(props: CanvasProps) {
  return (
    <div
      style={{ height: props.height, width: props.width, maxHeight: '100%' }}
    >
      <Flow />
    </div>
  );
}

export interface CanvasProps {
  height: number;
  width: number;
}

export default Canvas;
