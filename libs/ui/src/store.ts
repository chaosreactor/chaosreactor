import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
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

import { events, dispatch } from './bus';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';

export interface AppState {
  // Controls
  // -- Command bar
  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
  // -- Block inspector
  selectedBlock?: Node;
  setSelectedBlock: (block: Node) => void;
  blockInspectorOpen: boolean;
  setBlockInspectorOpen: (open: boolean) => void;

  nodes: Node[];
  setNodes: (nodes: Node[]) => Node[];
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

const useAppStore = create<AppState>()(
  subscribeWithSelector((set, get) => ({
    commandBarOpen: false,
    setCommandBarOpen: (open: boolean) => set({ commandBarOpen: open }),

    selectedBlock: undefined,
    setSelectedBlock: (block: Node) => set({ selectedBlock: block }),
    blockInspectorOpen: false,
    setBlockInspectorOpen: (open: boolean) => set({ blockInspectorOpen: open }),

    nodes: defaultNodes,
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
      console.log('changes', changes);
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
     * Update the nodes with a new set of nodes.
     *
     * @param nodes
     *   The new set of nodes.
     * @returns
     *   The updated nodes.
     */
    setNodes: (nodes: Node[]) => {
      set({ nodes });

      return nodes;
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

      // Dispatch an event to update the block in the database.
      dispatch({ type: events.blocks.update, payload: attributes });

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
  }))
);

export default useAppStore;
