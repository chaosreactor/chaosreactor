import {
  NodeSpecJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
  writeNodeSpecsToJSON,
} from 'behave-graph';

import { Text2Image, Image } from '../nodes';

let nodeSpecJSON: NodeSpecJSON[] | undefined = undefined;

export const getNodeSpecJSON = (): NodeSpecJSON[] => {
  if (nodeSpecJSON === undefined) {
    const registry = new Registry();

    // Register our custom nodes
    registry.nodes.register(Text2Image.Description);
    registry.nodes.register(Image.Description);

    registerCoreProfile(registry);
    registerSceneProfile(registry);
    nodeSpecJSON = writeNodeSpecsToJSON(registry);
  }

  return nodeSpecJSON;
};
