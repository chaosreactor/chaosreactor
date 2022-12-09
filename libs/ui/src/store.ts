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

import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';

export interface AppState {
  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (id: string, attributes: CreateBlockInput) => void;
  getNode: (id: string) => Node | undefined;
  deleteNode: (id: string) => void;
  updateNode: (attributes: UpdateBlockInput) => void;
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

  /**
   * Retrieve a node by its ID.
   *
   * @param id
   *   The ID of the node to retrieve.
   *
   * @returns
   *   The node with the given ID, or undefined if no such node exists.
   */
  getNode: (id: string) => get().nodes.find((n) => n.id === id),

  /**
   * Add a node.
   *
   * @param id
   *   The ID of the node to add.
   * @param attributes
   *   The attributes of the node to add.
   *
   * @returns
   *   The added node.
   */
  addNode: (id: string, attributes: CreateBlockInput) => {
    const node = {
      id,
      position: { x: attributes.x, y: attributes.y },
      type: attributes.type,
      data: { ...attributes.data },
    } as Node;

    set({
      nodes: [...get().nodes, node],
    });

    return node;
  },

  /**
   * Delete a node.
   *
   * @param id
   *   The ID of the node to delete.
   *
   * @returns
   *   The deleted node.
   */
  deleteNode: (id: string) => {
    const node = get().getNode(id);

    if (node) {
      set({
        nodes: get().nodes.filter((n) => n.id !== id),
      });
    }

    return node;
  },

  /**
   * Update a node.
   *
   * @param attributes
   *  The updated node attributes.
   *
   * @returns
   *   The updated node.
   */
  updateNode: (attributes: UpdateBlockInput) => {
    const id = attributes.params.blockId;
    const node = get().getNode(id);
    if (!node) return;

    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.position = {
            x: attributes?.body?.x || node.position.x || 0,
            y: attributes?.body?.y || node.position.y || 0,
          };

          node.type = attributes?.body?.type || node.type;

          node.data = { ...node.data, ...attributes?.body?.data };
        }

        return node;
      }),
    });
  },
}));

export default useAppStore;
