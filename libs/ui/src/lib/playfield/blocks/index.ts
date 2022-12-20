import { NodeTypes } from 'reactflow';

import PlaceholderNode from './placeholder';
import { ImageGeneratorBlock, IMAGE_GENERATOR_DATA } from './image-generator';
import React, { ReactElement, PropsWithChildren } from 'react';

export enum BlockType {
  Placeholder = 'placeholder',
  ImageGenerator = 'imageGenerator',
}

export interface BlockData {
  label: string;
  type: BlockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: React.ElementType<unknown>;
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
