import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import cx from 'classnames';

import styles from './blocks.module.css';
import usePlaceholderClick from '../hooks/usePlaceholderClick';

const PlaceholderNode = ({ id, data }: NodeProps) => {
  const onClick = usePlaceholderClick(id);

  const nodeClasses = cx(styles['node'], styles['placeholder']);

  return (
    <div onClick={onClick} className={nodeClasses} title="Click to add a block">
      {data.label}
      <Handle
        className={styles['handle']}
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        className={styles['handle']}
        type="source"
        position={Position.Bottom}
        isConnectable={false}
      />
    </div>
  );
};

export default memo(PlaceholderNode);
