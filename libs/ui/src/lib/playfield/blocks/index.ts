import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';
import { ImageGeneratorBlock } from './image-generator';

export enum BlockType {
  Placeholder = 'placeholder',
  ImageGenerator = 'imageGenerator',
}

export interface BlockData {
  label: string;
}

// The simple dictionary of block types needed for react-flow.
const blockTypes: NodeTypes = {
  placeholder: PlaceholderNode,
  imageGenerator: ImageGeneratorBlock,
};

interface BlockDataByBlockType {
  [key: string]: BlockData;
}

// Associated data for each block type.
export const blockData: BlockDataByBlockType = {
  [BlockType.Placeholder]: {
    label: 'Add first block',
  },
  [BlockType.ImageGenerator]: {
    label: 'Image Generator',
  },
};

export default blockTypes;
