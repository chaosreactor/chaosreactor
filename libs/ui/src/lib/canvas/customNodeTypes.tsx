import { NodeTypes } from "reactflow";
import { Node } from "./Node";
import { getNodeSpecJSON } from "../../../vendor/behave-flow/src/util/getNodeSpecJSON";

const spec = getNodeSpecJSON();

export const customNodeTypes = spec.reduce((nodes, node) => {
  nodes[node.type] = (props) => <Node spec={node} {...props} />;
  return nodes;
}, {} as NodeTypes);
