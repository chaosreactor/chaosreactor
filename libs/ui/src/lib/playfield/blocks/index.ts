import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';
import { ImageGeneratorBlock } from './image-generator';

// The simple dictionary of block types needed for react-flow.
const blockTypes: NodeTypes = {
  placeholder: PlaceholderNode,
  imageGenerator: ImageGeneratorBlock,
};

// Associated data for each block type.
export const blockData = {
  placeholder: {
    label: 'Add first block',
  },
  imageGenerator: {
    label: 'Image Generator',
  },
}

export default blockTypes;
