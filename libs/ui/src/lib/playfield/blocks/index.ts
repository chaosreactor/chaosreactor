import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';
import { ImageGeneratorBlock, IMAGE_GENERATOR_DATA } from './image-generator';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export enum BlockType {
  Placeholder = 'placeholder',
  ImageGenerator = 'imageGenerator',
}

export interface BlockData {
  label: string;
  type: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // The below type will need to be a union of every block's form props.
  form: ForwardRefExoticComponent<RefAttributes<unknown>>;
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
  [BlockType.ImageGenerator]: IMAGE_GENERATOR_DATA as BlockData,
};

export default blockTypes;
