import Flow from '../../../vendor/behave-flow/src/App';



/* eslint-disable-next-line */
export interface CanvasProps {
  height: number;
  width: number;
}

export function Canvas(props: CanvasProps) {
  return (
    <div
      style={{ height: props.height, width: props.width, maxHeight: '100%' }}
    >
      <Flow />
    </div>
  );
}

export default Canvas;
