import create from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

export interface AppState {
  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
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

const useAppStore = create<AppState>((set, get) => ({
  commandBarOpen: false,
  // The block that is currently selected in the command bar.
  selectedBlock: null,
  setCommandBarOpen: (open: boolean) => set({ commandBarOpen: open }),
  nodes: defaultNodes,
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));

export default useAppStore;
