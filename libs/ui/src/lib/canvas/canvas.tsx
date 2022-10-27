import { MouseEvent as ReactMouseEvent, useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  OnConnectionStartParams,
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
  XYPosition
} from 'reactflow';
import { v4 as uuidv4 } from "uuid";

import { behaveToFlow } from "../../../vendor/behave-flow/src/transformers/behaveToFlow";
import { customNodeTypes } from "../../../vendor/behave-flow/src/util/customNodeTypes";
import Controls from "../../../vendor/behave-flow/src/components/Controls";
import rawGraphJSON from "../../../vendor/behave-flow/src/graph.json";
import { GraphJSON } from "behave-graph";
import NodePicker from "../../../vendor/behave-flow/src/components/NodePicker";
import { getNodePickerFilters } from "../../../vendor/behave-flow/src/util/getPickerFilters";
import { calculateNewEdge } from "../../../vendor/behave-flow/src/util/calculateNewEdge";

import BaseNode from './BaseNode';

import 'reactflow/dist/style.css';

import styles from './canvas.module.css';

const graphJSON = rawGraphJSON as GraphJSON;
const [initialNodes, initialEdges] = behaveToFlow(graphJSON);


const proOptions = { hideAttribution: true };

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node!!!' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    type: 'custom',
    className: styles['customNode'],
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const nodeTypes = {
  custom: BaseNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

/* eslint-disable-next-line */
export interface CanvasProps {
  height: number;
  width: number;
}

export function Canvas(props: CanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  return (
    <div className={styles['canvasContainer']} style={{ height: props.height, width: props.width, maxHeight: '100%' }}>
      <ReactFlow
        panOnScroll={true}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        className={styles['canvas']}
        style={{ height: '100%', width: '100%', background: 'transparent' }}
        proOptions={proOptions}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
