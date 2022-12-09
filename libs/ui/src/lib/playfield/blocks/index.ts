import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';
import { ImageGeneratorBlock } from './image-generator';

// two different node types are needed for our example: workflow and placeholder nodes
const blockTypes: NodeTypes = {
  placeholder: PlaceholderNode,
  imageGenerator: ImageGeneratorBlock,
};

export default blockTypes;
