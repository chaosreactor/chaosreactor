import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';

// two different node types are needed for our example: workflow and placeholder nodes
const blockTypes: NodeTypes = {
  placeholder: PlaceholderNode,
};

export default blockTypes;
