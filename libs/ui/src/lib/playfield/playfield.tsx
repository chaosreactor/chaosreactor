import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

import styles from './playfield.module.css';

/* eslint-disable-next-line */
export interface PlayfieldProps {
  height: string;
  width: string;
}

export function Playfield(props: PlayfieldProps) {
  const proOptions = {
    // passing in the account property will enable hiding the attribution
    account: 'paid-pro',
    // in combination with the account property, hideAttribution: true will remove the attribution
    hideAttribution: true,
  };

  return (
    <div
      id="playfield"
      className={styles['container']}
      style={{ height: props.height, width: props.width, maxHeight: '100%' }}
    >
      <ReactFlow proOptions={proOptions}>
        <Background color="#5c6169" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Playfield;
